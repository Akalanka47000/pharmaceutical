import { useState } from 'react';
import { Modal } from 'flowbite-react';
import { toast } from 'react-toastify';
import { isEmpty, omitBy } from 'lodash';
import { Input, Button } from '../common';
import { createUser, updateUser } from '../../services';

const initialFormData = {
  name: '',
  email: '',
  mobile: '',
  address: '',
};

const UserModal = ({ user, show, setShow, refresh = () => {} }) => {
  const [formData, setFormData] = useState(!isEmpty(user) ? user : initialFormData);

  const onSubmit = async () => {
    if (!isEmpty(user)) {
      await updateUser(
        user._id,
        omitBy(
          {
            name: formData.name,
            mobile: formData.mobile,
            address: formData.address,
          },
          isEmpty,
        ),
      ).then((res) => {
        if (res.success) {
          toast.success('User updated successfully');
        }
      });
    } else {
      await createUser({ ...formData, is_verified: true, role: 'admin' }).then((res) => {
        if (res.success) {
          toast.success('User added successfully');
          setFormData(initialFormData);
        }
      });
    }
    setShow(false);
    refresh();
  };

  const onChange = (e, key) => {
    setFormData({
      ...formData,
      [key || e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      show={show}
      size="2xl"
      onClose={() => {
        setShow(false);
      }}
    >
      <Modal.Header color="white">{!isEmpty(user) ? 'Update' : 'Add'} Admin User</Modal.Header>
      <Modal.Body>
        <form>
          <div class="flex flex-col mb-4">
            <Input placeholder="Name" name="name" value={formData.name} className="h-12 sm:h-14 light" theme="light" required="true" onChange={onChange} />
            {isEmpty(user) && <Input placeholder="Email" name="email" value={formData.email} className="h-12 sm:h-14 light" theme="light" required="true" onChange={onChange} />}
            <Input placeholder="Mobile" name="mobile" value={formData.mobile} className="h-12 sm:h-14 light" theme="light" required="true" onChange={onChange} />
            <Input placeholder="Address" name="address" value={formData.address} className="h-12 sm:h-14 light" theme="light" required="true" onChange={onChange} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="py-2 px-5" onClick={onSubmit}>
          {!isEmpty(user) ? 'Update' : 'Add'}
        </Button>
        <Button
          className="py-2 px-5 bg-red-500 hover:bg-red-600"
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
