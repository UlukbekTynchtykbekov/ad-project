import React, {useEffect, useState} from 'react';
import './new-architect.scss'
import Sidebar from "../../components/Sidebar/Sidebar";
import {request} from "../../utils/axios-utils";
import {useAddArchitect, useSingleArchitectData, useUpdateArchitect} from "../../CustomHooks/useArchitectData";
import {Navigate, useParams} from "react-router-dom";
import UploadImages from "../UploadImages/UploadImages";
import {toast} from "react-toastify";

const NewArchitect = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        bio: "",
        images: [],
    });
    const [formErrors, setFormErrors] = useState({});
    const {id: architectId} = useParams();

    const addingSuccess = () => {
        toast.success('Архитектор был успешно добавлен', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const addingError = () => {
        toast.error('Ошибка при добавлении архитектора', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const {mutate: addArchitect, data: addedArchitectData, isLoading: addArchitectLoading} = useAddArchitect(addingSuccess, addingError);
    const {data: architectData, isLoading: architectLoading, isError: architectIsError, error: architectError} = useSingleArchitectData(architectId);
    const {mutate: updateArchitect, data:updatedArchitectData, isLoading: updateLoading} = useUpdateArchitect(addingSuccess, addingError)

    const handleInputChange = (event) => {
        const {name, value, files} = event.target;
        if (name === "images") {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                data.append("images", files[i]);
            }
            return request({url: '/api/upload', method: 'POST', data: data})
                .then(response => {
                    const {data} = response;
                    setFormData((prevState) => ({
                        ...prevState,
                        images: [...prevState.images, ...data?.data]
                    }));
                })
        }else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const deleteImage = (id) => {
        const findId = formData.images.find(img => img.public_id === id);
        if (findId){
            setFormData((prevState) => ({
                ...prevState,
                images: formData.images.filter(img => img.public_id !== id)
            }));
        }
    }

    const selectArchitectMainPhoto = (id) => {
        const mainImage = formData.images.find(img => img.public_id === id);
        const addedPhotosWithoutSelected = formData.images.filter(img => img.public_id !== id);
        const newAddedPhotos = [mainImage, ...addedPhotosWithoutSelected];
        setFormData((prevState) => ({
            ...prevState,
            images: [...newAddedPhotos]
        }));
    }

    const onSubmitProduct = (e) => {
        e.preventDefault();
        const errors = validateInputs(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            if (architectId) {
                updateArchitect({architectId, ...formData})
            } else {
                addArchitect(formData)
            }
        }
    }

    function validateInputs(inputData) {
        let errors = {};
        const types = ["png", "jpeg", "jpg"]

        if (inputData.firstname.trim().length < 3 && inputData.firstname.trim().length < 200) {
            errors.firstname = "Имя должно быть больше 3 букв и меньше 200 букв"
        }
        if (inputData.lastname.trim().length < 3 && inputData.lastname.trim().length < 200) {
            errors.lastname = "Фамилия должно быть больше 3 букв и меньше 200 букв"
        }
        if (!inputData.dateOfBirth.length){
            errors.dateOfBirth = "Обязательное поле"
        }

        if (inputData.images.length < 1) {
            errors.images = "Обязательное поле";
        }

        for (let i = 0; i < inputData.images.length; i++) {
            const file = inputData.images[i];
            const fileType = file.format;
            if (!types.includes(fileType)) {
                errors.images = "Разрешены только изображения.";
            }
        }

        return errors;
    }

    useEffect(() => {
        if (architectData?.data){
            const dateString = architectData?.data.dateOfBirth;
            const dateParts = dateString.split("T");
            const date = dateParts[0];

            setFormData((prevState) => ({
                ...prevState,
                firstname: architectData?.data.firstname,
                lastname: architectData?.data.lastname,
                dateOfBirth: date,
                bio: architectData?.data.bio,
                images: architectData?.data.images
            }));
        }
    }, [architectData?.data])

    if (addedArchitectData?.data || updatedArchitectData?.data){
        return <Navigate to="/admin/architect"/>
    }

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                {
                    architectLoading &&  <div style={{color: "white"}}>Loading...</div>
                }

                {
                    architectIsError &&  <div style={{color: "white"}}>{architectError?.message}</div>
                }
                <div className="new">
                    <div className="new__wrapper">
                        <h2 className="new__text">Добавить архитектор</h2>
                    </div>
                    <form className="formik" onSubmit={onSubmitProduct}>
                        <div className="formik__group">
                            <h2 className="formik__text">Имя</h2>
                            <input
                                className="formik__input"
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                placeholder="Имя архитектора"
                                onChange={handleInputChange}
                            />
                            {
                                formErrors.firstname && <p className="formik__error">*{formErrors.firstname}</p>
                            }
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Фамилия</h2>
                            <input
                                className="formik__input"
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                placeholder="Фамилия архитектора"
                                onChange={handleInputChange}
                            />
                            {
                                formErrors.lastname && <p className="formik__error">*{formErrors.lastname}</p>
                            }
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Дата рождения</h2>
                            <input
                                className="formik__input"
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                placeholder="Дата рождения"
                                onChange={handleInputChange}
                            />
                            {
                                formErrors.dateOfBirth && <p className="formik__error">*{formErrors.dateOfBirth}</p>
                            }
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Краткая биография</h2>
                            <textarea
                                className="formik__input formik__input-textarea"
                                placeholder="Краткая биография"
                                cols="30"
                                rows="10"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                            >
                            </textarea>
                        </div>
                        <UploadImages namePhoto="images" text="Фото" photos={formData.images} deletePhoto={deleteImage} uploadPhoto={handleInputChange} photosError={formErrors.images} selectMainPhoto={selectArchitectMainPhoto}/>
                        <button className={ addArchitectLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"} type="submit" disabled={addArchitectLoading || updateLoading}>добавить</button>
                        {
                            addArchitectLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                        }
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewArchitect;