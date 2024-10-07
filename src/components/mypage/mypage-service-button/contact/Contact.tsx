import { myInfoServiceAccordianBox, myInfoServiceAccordianText, myInfoServiceAccordianTitle } from './contact.css';

const Contact = () => {
  return (
    <article className={myInfoServiceAccordianBox}>
      <h3 className={myInfoServiceAccordianTitle}>Contact us</h3>
      <p className={myInfoServiceAccordianText}>0507-1377-5353</p>
      <p className={myInfoServiceAccordianText}>hello@perfitt.io</p>
    </article>
  );
};

export default Contact;
