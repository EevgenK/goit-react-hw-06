import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { selectNameFilter } from "../../redux/filtersSlice";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const search = useSelector(selectNameFilter);
  const items = !search
    ? contacts
    : contacts.filter(({ name, number }) => {
        return name.toLowerCase().includes(search) || number.includes(search);
      });

  return (
    <ul className={s.list}>
      {items.map(({ id, name, number }) => (
        <Contact key={id} contacts={{ id, name, number }} />
      ))}
    </ul>
  );
};

export default ContactList;
