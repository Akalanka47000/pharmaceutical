import { useState } from 'react';
import { Modal } from 'flowbite-react';
import { toast } from 'react-toastify';
import { Input, Button } from '../common';
import { createTicket } from '../../services';

const initialFormData = {
  title: '',
  description: '',
};

const TicketModal = ({ show, setShow, refresh = () => { } }) => {
  const [formData, setFormData] = useState(initialFormData);

  const onSubmit = async () => {
    await createTicket(formData).then((res) => {
      if (res.success) {
        toast.success('Ticket created successfully');
        setFormData(initialFormData);
      }
    });
    setShow(false);
    refresh();
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      show={show}
      size="2xl"
      onClose={() => setShow(false)}
    >
      <Modal.Header color="white">Create Ticket</Modal.Header>
      <Modal.Body>
        <form>
          <div class="flex flex-col mb-4">
            <Input placeholder="Title" name="title" label value={formData.title} className="h-12 sm:h-14 light" theme="light" required="true" onChange={onChange} />
            <Input placeholder="Description" name="description" label value={formData.description} className="h-12 sm:h-14 light" theme="light" required="true" onChange={onChange} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="py-2 px-5" onClick={onSubmit}>
          Create
        </Button>
        <Button
          className="py-2 px-5 bg-red-500 hover:bg-red-600"
          onClick={() => setShow(false)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketModal;
