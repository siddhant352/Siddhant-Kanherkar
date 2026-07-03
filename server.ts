import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser } from './src/db/users.ts';
import { db } from './src/db/index.ts';
import { appointments, contactMessages, reviews, users } from './src/db/schema.ts';
import { eq, desc } from 'drizzle-orm';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://ittvvtcpbwokdnysupxq.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_zCdjLQz5Fbj5tH5k6gG2PA_C9HL2Ya3';
const supabase = createClient(supabaseUrl, supabaseKey);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // Check auth and sync user
  app.post("/api/admin/simple-login", (req, res) => {
    const { email, password } = req.body;
    if (email === 'siddhantkanherkar97@gmail.com' && password === 'maheshwari@123') {
      res.json({ token: 'admin-secret-token', user: { email, isAdmin: true } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  app.post("/api/auth/login", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user) return res.status(401).json({ error: "No user found" });
      const user = await getOrCreateUser(req.user.uid, req.user.email || '');
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Public routes
  app.post("/api/appointments", async (req, res) => {
    try {
      const { name, phone, date } = req.body;
      await db.insert(appointments).values({ name, phone, date });
      
      // Save to Supabase
      try {
        await supabase.from('appointments').insert([{ name, phone, date }]);
      } catch (sbErr) {
        console.error("Supabase appointments insert error:", sbErr);
      }

      // Simulate sending email notification
      console.log(`[EMAIL NOTIFICATION] New consultation booked by ${name} (${phone}) on ${date}`);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      await db.insert(contactMessages).values({ name, email, message });
      
      // Save to Supabase
      try {
        await supabase.from('contact_messages').insert([{ name, email, message }]);
      } catch (sbErr) {
        console.error("Supabase contact_messages insert error:", sbErr);
      }

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const { name, text, rating = 5 } = req.body;
      await db.insert(reviews).values({ name, text, rating, isApproved: true });
      
      // Save to Supabase
      try {
        await supabase.from('reviews').insert([{ name, text, rating, is_approved: true }]);
      } catch (sbErr) {
        console.error("Supabase reviews insert error:", sbErr);
      }

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const requireAdmin = async (req: AuthRequest, res: any, next: any) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    if (req.user.uid === 'simple-admin' && req.user.isAdmin) {
      return next();
    }
    try {
      const dbUser = await db.select().from(users).where(eq(users.uid, req.user.uid)).limit(1);
      if (!dbUser.length || !dbUser[0].isAdmin) {
        return res.status(403).json({ error: "Forbidden: Admins only" });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  app.post("/api/admin/reviews", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { name, text, rating = 5, isApproved = true } = req.body;
      await db.insert(reviews).values({ name, text, rating, isApproved });
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/reviews/approved", async (req, res) => {
    try {
      const approvedReviews = await db.select().from(reviews).where(eq(reviews.isApproved, true)).orderBy(desc(reviews.createdAt));
      res.json(approvedReviews);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Admin routes
  app.get("/api/admin/dashboard", requireAuth, requireAdmin, async (req, res) => {
    try {
      const allAppointments = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
      const allMessages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
      const allReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
      res.json({ appointments: allAppointments, messages: allMessages, reviews: allReviews });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/admin/appointments/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      await db.update(appointments).set({ status }).where(eq(appointments.id, parseInt(req.params.id)));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/admin/reviews/:id/approve", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { isApproved } = req.body;
      await db.update(reviews).set({ isApproved }).where(eq(reviews.id, parseInt(req.params.id)));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/admin/reviews/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await db.delete(reviews).where(eq(reviews.id, parseInt(req.params.id)));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
