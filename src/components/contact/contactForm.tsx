import { Button } from '@/components/ui/button';
import { formItems } from '@/constants/form-items';

const ContactForm = () => {
  return (
    <form className="space-y-6">
      {formItems.map(({ id, label, component: Component, ...props }) => (
        <div key={id}>
          <label htmlFor={id} className="block mb-2 text-sm font-medium">
            {label}
          </label>
          <Component id={id} {...props} />
        </div>
      ))}
      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-gray-800"
      >
        Відправити
      </Button>
    </form>
  );
};

export default ContactForm;
