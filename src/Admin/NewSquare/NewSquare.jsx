import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useAddSquare, useSingleSquareData, useUpdateSquare} from "../../CustomHooks/useSquareData";

const NewSquare = () => {
    const [formData, setFormData] = useState({
        square: 0,
    });
    const [formErrors, setFormErrors] = useState({});
    const {id: squareId} = useParams();

    const {mutate: addSquare, data: addedSquareData, isLoading: addSquareLoading} = useAddSquare();
    const {data: squaresData, isLoading: squaresLoading, isError: squaresIsError, error: squaresError} = useSingleSquareData(squareId);
    const {mutate: updateSquare, data:updatedSquareData, isLoading: updateLoading} = useUpdateSquare()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const onSubmitProduct = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            if (squareId){
                updateSquare({squareId, ...formData})
            }else{
                addSquare(formData)
            }
        }
    }

    const validateForm = (data) => {
        const errors = {};

        if (data.square < 10) {
            errors.square = "Количество квадратов должно быть больше 10м2";
        }

        return errors;
    };

    console.log(formData)

    useEffect(() => {
        if (squaresData?.data){
            setFormData((prevState) => ({
                ...prevState,
                square: squaresData?.data.square
            }))
        }
    }, [squaresData?.data])

    if(addedSquareData?.data || updatedSquareData?.data){
        return <Navigate to="/admin/square"/>
    }

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                {
                    squaresLoading &&  <div style={{color: "white"}}>Loading...</div>
                }

                {
                    squaresIsError &&  <div style={{color: "white"}}>{squaresError?.message}</div>
                }
                <div className="new">
                    <div className="new__wrapper">
                        <h2 className="new__text">Добавить квадрат</h2>
                    </div>
                    <form className="formik" onSubmit={onSubmitProduct}>
                        <div className="formik__group">
                            <h2 className="formik__text">Квадрат</h2>
                            <input
                                className="formik__input"
                                name="square"
                                type="number"
                                value={formData.square}
                                placeholder="Количество квадратов"
                                onChange={handleInputChange}
                            />
                            {
                                formErrors.square && <p className="formik__error">*{formErrors.square}</p>
                            }
                        </div>
                        <button className={ addSquareLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"} type="submit" disabled={addSquareLoading || updateLoading}>добавить</button>
                        {
                            addSquareLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                        }
                        {
                            addedSquareData?.response.data || updatedSquareData?.response.data ? <div>
                                <p className="formik__error">Квадрат проекта уже существует или вы должны правильно заполнить все данные</p>
                            </div> : null
                        }
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewSquare;