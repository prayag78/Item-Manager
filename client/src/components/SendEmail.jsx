import emailjs from 'emailjs-com';
import { toast } from 'react-hot-toast';

const sendEmail = (item) => {
    const templateParams = {
        item_name: item.name,
        item_type: item.type,
        item_description: item.description
      };

  emailjs.send(
    'service_94ojp6p',
    'template_pusfip8',
    templateParams,
    'NiMN_McRSCP0GilJT'
  )
  .then(() => {
    const notify = () => toast('Email sent successfully!'); 
    notify()
  })
  .catch((err) => {
    console.error('Failed to send email', err);
  });
};

export default sendEmail;