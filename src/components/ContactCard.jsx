import { useNavigate } from "react-router-dom";

export const ContactCard = ({ contact, onDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div className="card contact-card mb-3 p-3 d-flex flex-row align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <img
          src="https://elcomercio.pe/resizer/v2/UCERLGY7DRHXVGCG4CB7DGFP2Q.jpg?auth=9dae6868522bd012fd794af64d752ea9b22c0f277a88de86c04d214531f9f37c&width=1200&height=810&quality=75&smart=true"
          alt={`Avatar de ${contact.name}`}
          className="rounded-circle me-3 contact-avatar"
        />

        <div>
          <h5 className="mb-2">{contact.name}</h5>
          <p className="mb-0">{contact.address}</p>
          <p className="mb-0">{contact.phone}</p>
          <p className="mb-0">{contact.email}</p>
        </div>
      </div>

      <div>
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => navigate(`/edit-contact/${contact.id}`)}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>

        <button
          className="btn btn-outline-danger"
          onClick={() => onDeleteClick(contact)}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
};