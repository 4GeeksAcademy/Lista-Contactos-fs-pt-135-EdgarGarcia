export const ConfirmModal = ({ contact, onCancel, onConfirm, isDeleting }) => {
  if (!contact) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">¿Estás seguro?</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              disabled={isDeleting}
            ></button>
          </div>

          <div className="modal-body">
            <p>Vas a eliminar a {contact.name}. Esta acción no se puede deshacer.</p>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isDeleting}
            >
              Cancelar
            </button>

            <button
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};