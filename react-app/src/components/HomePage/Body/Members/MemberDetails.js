import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
// import get member details thunk here


export default function MemberDetails() {
    const dispatch = useDispatch();
    const member = useSelector(state => state.members.id);

    return null;
} 
