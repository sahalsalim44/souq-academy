import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertEnrollmentSchema, 
  insertBrochureDownloadSchema, 
  insertHireRequestSchema, 
  insertTestimonialSchema, 
  insertContactMessageSchema 
} from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Enrollments
  app.post("/api/enrollments", async (req, res) => {
    try {
      const enrollmentData = insertEnrollmentSchema.parse(req.body);
      const enrollment = await storage.createEnrollment(enrollmentData);
      res.json(enrollment);
    } catch (error) {
      res.status(400).json({ message: "Invalid enrollment data" });
    }
  });

  app.get("/api/enrollments", async (req, res) => {
    try {
      const enrollments = await storage.getAllEnrollments();
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  // Brochure downloads
  app.post("/api/brochure-downloads", async (req, res) => {
    try {
      const downloadData = insertBrochureDownloadSchema.parse(req.body);
      const download = await storage.createBrochureDownload(downloadData);
      res.json(download);
    } catch (error) {
      res.status(400).json({ message: "Invalid download data" });
    }
  });

  app.get("/api/brochure-downloads", async (req, res) => {
    try {
      const downloads = await storage.getAllBrochureDownloads();
      res.json(downloads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch downloads" });
    }
  });

  // Hire requests
  app.post("/api/hire-requests", async (req, res) => {
    try {
      const requestData = insertHireRequestSchema.parse(req.body);
      const hireRequest = await storage.createHireRequest(requestData);
      res.json(hireRequest);
    } catch (error) {
      res.status(400).json({ message: "Invalid hire request data" });
    }
  });

  app.get("/api/hire-requests", async (req, res) => {
    try {
      const requests = await storage.getAllHireRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hire requests" });
    }
  });

  // Testimonials
  app.post("/api/testimonials", async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ message: "Invalid testimonial data" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTestimonial(id);
      res.json({ message: "Testimonial deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Contact messages
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact message data" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  // Excel export endpoints
  app.get("/api/export/enrollments", async (req, res) => {
    try {
      const enrollments = await storage.getAllEnrollments();
      
      // Simple CSV format for Excel compatibility
      const csvHeader = "ID,Name,Phone,Course,Date\n";
      const csvData = enrollments.map(e => 
        `${e.id},"${e.name}","${e.phone}","${e.course}","${e.createdAt?.toISOString() || ''}"`
      ).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="enrollments.csv"');
      res.send(csvHeader + csvData);
    } catch (error) {
      res.status(500).json({ message: "Failed to export enrollments" });
    }
  });

  app.get("/api/export/brochure-downloads", async (req, res) => {
    try {
      const downloads = await storage.getAllBrochureDownloads();
      
      const csvHeader = "ID,Name,Email,Phone,Date\n";
      const csvData = downloads.map(d => 
        `${d.id},"${d.name}","${d.email}","${d.phone}","${d.createdAt?.toISOString() || ''}"`
      ).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="brochure-downloads.csv"');
      res.send(csvHeader + csvData);
    } catch (error) {
      res.status(500).json({ message: "Failed to export brochure downloads" });
    }
  });

  app.get("/api/export/hire-requests", async (req, res) => {
    try {
      const requests = await storage.getAllHireRequests();
      
      const csvHeader = "ID,Company Name,Email,Phone,Job Role,Requirements,Date\n";
      const csvData = requests.map(r => 
        `${r.id},"${r.companyName}","${r.email}","${r.phone}","${r.jobRole}","${r.requirements || ''}","${r.createdAt?.toISOString() || ''}"`
      ).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="hire-requests.csv"');
      res.send(csvHeader + csvData);
    } catch (error) {
      res.status(500).json({ message: "Failed to export hire requests" });
    }
  });

  // Download brochure file
  app.get("/api/download/brochure", (req, res) => {
    // Generate a simple brochure content
    const brochureContent = `
SOUQ ACADEMY - Course Brochure

Our Courses:
1. Java Fullstack Development (6 months)
2. Python Fullstack Development (6 months)  
3. Digital Marketing (4 months)

Features:
- 100% Placement Assistance
- Hands-on Experience
- Expert Instructors
- Industry-Relevant Curriculum

Contact: info@souqacademy.com
Phone: +91 98765 43210
    `;
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="SOUQ_Academy_Brochure.txt"');
    res.send(brochureContent);
  });

  const httpServer = createServer(app);
  return httpServer;
}
