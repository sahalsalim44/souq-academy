import { 
  users, 
  enrollments, 
  brochureDownloads, 
  hireRequests, 
  testimonials, 
  contactMessages,
  type User, 
  type InsertUser, 
  type Enrollment, 
  type InsertEnrollment,
  type BrochureDownload,
  type InsertBrochureDownload,
  type HireRequest,
  type InsertHireRequest,
  type Testimonial,
  type InsertTestimonial,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getAllEnrollments(): Promise<Enrollment[]>;
  
  createBrochureDownload(download: InsertBrochureDownload): Promise<BrochureDownload>;
  getAllBrochureDownloads(): Promise<BrochureDownload[]>;
  
  createHireRequest(request: InsertHireRequest): Promise<HireRequest>;
  getAllHireRequests(): Promise<HireRequest[]>;
  
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getAllTestimonials(): Promise<Testimonial[]>;
  deleteTestimonial(id: number): Promise<void>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private enrollments: Map<number, Enrollment>;
  private brochureDownloads: Map<number, BrochureDownload>;
  private hireRequests: Map<number, HireRequest>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.enrollments = new Map();
    this.brochureDownloads = new Map();
    this.hireRequests = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    this.currentId = 1;
    
    // Initialize with default admin user
    this.users.set(1, {
      id: 1,
      username: "admin",
      password: "sdlc.sahal" // In production, this should be hashed
    });
    
    // Initialize with default testimonials
    this.testimonials.set(1, {
      id: 1,
      name: "Rajesh Kumar",
      position: "Software Engineer at TCS",
      testimonial: "SOUQ Academy transformed my career completely. The Java fullstack course was comprehensive and the placement support was excellent. I got placed at a top tech company within 2 weeks of completion!",
      createdAt: new Date()
    });
    
    this.testimonials.set(2, {
      id: 2,
      name: "Priya Sharma",
      position: "Python Developer at Zomato",
      testimonial: "The Python course was amazing! The instructors were highly knowledgeable and the hands-on projects helped me build a strong portfolio. Now I'm working as a Python developer at a startup.",
      createdAt: new Date()
    });
    
    this.testimonials.set(3, {
      id: 3,
      name: "Amit Patel",
      position: "Digital Marketing Consultant",
      testimonial: "Digital Marketing course gave me all the tools I needed to succeed. From SEO to social media marketing, everything was covered in detail. I'm now running my own digital marketing agency!",
      createdAt: new Date()
    });
    
    this.currentId = 4;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const id = this.currentId++;
    const newEnrollment: Enrollment = { 
      ...enrollment, 
      id, 
      createdAt: new Date() 
    };
    this.enrollments.set(id, newEnrollment);
    return newEnrollment;
  }

  async getAllEnrollments(): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values());
  }

  async createBrochureDownload(download: InsertBrochureDownload): Promise<BrochureDownload> {
    const id = this.currentId++;
    const newDownload: BrochureDownload = { 
      ...download, 
      id, 
      createdAt: new Date() 
    };
    this.brochureDownloads.set(id, newDownload);
    return newDownload;
  }

  async getAllBrochureDownloads(): Promise<BrochureDownload[]> {
    return Array.from(this.brochureDownloads.values());
  }

  async createHireRequest(request: InsertHireRequest): Promise<HireRequest> {
    const id = this.currentId++;
    const newRequest: HireRequest = { 
      ...request, 
      id, 
      createdAt: new Date(),
      requirements: request.requirements || null
    };
    this.hireRequests.set(id, newRequest);
    return newRequest;
  }

  async getAllHireRequests(): Promise<HireRequest[]> {
    return Array.from(this.hireRequests.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentId++;
    const newTestimonial: Testimonial = { 
      ...testimonial, 
      id, 
      createdAt: new Date() 
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async deleteTestimonial(id: number): Promise<void> {
    this.testimonials.delete(id);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentId++;
    const newMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
