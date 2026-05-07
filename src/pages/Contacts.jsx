import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import { ContactCard } from "../components/ContactCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ConfirmModal } from "../components/ConfirmModal";

const AGENDA_SLUG = "edgar_contacts_2026";

export const Contacts = () => {
  const { store, dispatch } = useGlobalReducer();

  const navigate = useNavigate();

  const [contactToDelete, setContactToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`
      );

      const data = await response.json();

      dispatch({
        type: "set_contacts",
        payload: data.contacts,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchContacts();
}, []);

if (loading) {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary"></div>
      <p>Cargando contactos...</p>
    </div>
  );
}
  

  return (
  <div className="container mt-4">
    <h1>Contactos</h1>

    <button
      className="btn btn-success mb-4"
      onClick={() => navigate("/add-contact")}
    >
      Agregar contacto
    </button>

    {store.contacts.map((contact) => (
  <ContactCard
    key={contact.id}
    contact={contact}
    onDeleteClick={setContactToDelete}
  />
))}

<ConfirmModal
  contact={contactToDelete}
  onCancel={() => setContactToDelete(null)}
  onConfirm={async () => {
  try {
    await fetch(
      `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${contactToDelete.id}`,
      {
        method: "DELETE",
      }
    );

    dispatch({
      type: "delete_contact",
      payload: contactToDelete.id,
    });

    setContactToDelete(null);
  } catch (error) {
    console.error("Error eliminando contacto:", error);
  }
}}
/>

  </div>
);
}