import React, { useEffect } from 'react'
import { Navbar } from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';

const Applicants = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const token = localStorage.getItem("token"); 
                const res = await axios.get(`https://portal-server-cpms123.vercel.app/api/application/${params.id}/applicants`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                    withCredentials: true
                });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log("Error fetching applicants:", error);
            }
        };
        fetchAllApplicants();
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
