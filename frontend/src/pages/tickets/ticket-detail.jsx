import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Rating, Table } from 'flowbite-react';
import { Layout } from '../../components/layout';
import { Button } from '../../components/common';
import { getTicket, addReply, closeTicket } from '../../services';
import toast from '../../libs/toastify';

function TicketDetail() {
    const { ticket_id: ticketId } = useParams();
    const [ticket, setTicket] = useState({});
    const [reply, setReply] = useState("");

    const user = useSelector((store) => store.data.user.authUser);

    useEffect(() => {
        const singleTicket = async () => {
            const response = await getTicket(ticketId);
            setTicket(response.data);
        };
        singleTicket();
    }, [ticketId]);

    const onClickAddReply = () => {
        addReply(ticketId, reply), then((data) => {
            data && toast.success(data.message)
        })
    };

    const onClickCloseTicket = () => {
        closeTicket(ticketId), then((data) => {
            data && toast.success(data.message)
        })
    };

    return (
        <Layout title="Home">

        </Layout>
    );
}

export default TicketDetail;