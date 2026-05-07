import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const AGENDA_SLUG = "edgar_contacts_2026";

export const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [saving, setSaving] = useState(false);

  const contactToEdit = store.contacts.find(
    (contact) => contact.id === Number(id)
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        address: contactToEdit.address,
      });
    }
  }, [contactToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      if (contactToEdit) {
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${contactToEdit.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        dispatch({
          type: "update_contact",
          payload: data,
        });
      } else {
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        dispatch({
          type: "add_contact",
          payload: data,
        });
      }

      navigate("/contacts");
    } catch (error) {
      console.error("Error guardando contacto:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>{contactToEdit ? "Editar contacto" : "Agregar contacto"}</h1>

      <form className="mt-3" onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Dirección"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />

        <button className="btn btn-primary" disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </button>

        <button
          type="button"
          className="btn btn-link mt-2"
          onClick={() => navigate("/contacts")}
        >
          Volver a contactos
        </button>
      </form>
    </div>
  );
};