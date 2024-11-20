import { contactItems } from '@/constants/contact-items';
import { socialLinks } from '@/constants/social-links';

const ContactInfo = () => {
  const SocialLinks = () => {
    return (
      <div className="flex space-x-4">
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <a key={label} href={href} className="text-black hover:text-gray-600">
            <Icon className="h-6 w-6" />
            <span className="sr-only">{label}</span>
          </a>
        ))}
      </div>
    );
  };

  const ContactInfo = () => {
    return (
      <div className="space-y-2">
        {contactItems.map(({ icon: Icon, text }, index) => (
          <p key={index} className="flex items-center">
            <Icon className="mr-2 h-5 w-5" />
            {text}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Контактна інформація</h3>
        <ContactInfo />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Слідкуйте за нами</h3>
        <SocialLinks />
      </div>
    </div>
  );
};

export default ContactInfo;
