import ContactForm from '@/components/contacts/contactForm';
import ContactInfo from '@/components/contacts/contactInfo';

const ContactsPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-2xl font-semibold">Зв&#39;яжіться з нами</h2>
        <div className="grid gap-12 md:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </main>
    </div>
  );
};

export default ContactsPage;
