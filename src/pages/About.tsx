import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Users, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Lemaci</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Your trusted partner for quality electronics and accessories
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-lg">
                <p className="text-muted-foreground mb-4">
                  Lemaci was founded with a simple mission: to provide quality electronics and accessories at competitive prices while delivering exceptional customer service.
                </p>
                <p className="text-muted-foreground mb-4">
                  We understand that technology plays a crucial role in modern life, and we're committed to making premium products accessible to everyone. Our carefully curated selection ensures that every item meets our high standards for quality and value.
                </p>
                <p className="text-muted-foreground">
                  Today, we serve thousands of satisfied customers across the region, and we're constantly expanding our product range to meet evolving needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  We carefully select and test every product to ensure it meets our high standards before offering it to our customers.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Customer Focus</h3>
                <p className="text-muted-foreground">
                  Our customers are at the heart of everything we do. We strive to provide exceptional service and support at every step.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We stay ahead of trends to bring you the latest and most innovative products in the electronics market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions or want to learn more? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0713929274"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Call Us: 071 392 9274
              </a>
              <a
                href="mailto:cicilymbogo820@gmail.com"
                className="inline-flex items-center justify-center px-8 py-3 border border-border text-base font-medium rounded-md hover:bg-muted transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
