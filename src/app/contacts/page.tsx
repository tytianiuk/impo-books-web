import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-2xl font-semibold">Зв&#39;яжіться з нами</h2>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Ім&#39;я
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Ел. пошта
                </label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium"
                >
                  Повідомлення
                </label>
                <Textarea id="message" placeholder="Your message" rows={4} />
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                Відправити
              </Button>
            </form>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Контактна інформація
              </h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  123 Book Street, Reading City, 12345
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  (123) 456-7890
                </p>
                <p className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  contact@impobooks.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Слідкуйте за нами</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-black hover:text-gray-600">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-black hover:text-gray-600">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-black hover:text-gray-600">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
