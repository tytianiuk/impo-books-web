import ContactForm from '@/components/contact/contactForm';
import ContactInfo from '@/components/contact/contactInfo';

const ContactsPage = () => {
  return (
    <main className="container mx-auto px-4 py-12">
      <h2 className="mb-8 text-2xl font-semibold">Зв&#39;яжіться з нами</h2>
      <div className="grid gap-12 md:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
    </main>
  );
};

export default ContactsPage;
