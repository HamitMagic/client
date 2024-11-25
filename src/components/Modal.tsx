import React from 'react'
import ApiService from '../shared/API.service';

interface Props {
    date: Date;
    isShown: boolean;
    onClose: () => void;
    zIndex?: number;
    callback: () => void;
    setDate: (date: Date) => void;
}

function Modal(props: Props) {
    const [date, setDate] = React.useState<Date>(new Date());
    const [taskName, setTaskName] = React.useState('');

    React.useEffect(() => {
        setDate(props.date);
    },[props.date])

    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        try {
            const task = await ApiService.createTask({
                title: taskName,
                date: date,
            })
            if (task.id) {
                setTaskName('');
                props.callback();
                props.setDate(date);
                props.onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const isValid = ():boolean => {
        if (taskName && date.getDate()) {
            return true;
        }
        return false;
    }

    return (
        <React.Fragment>
            {props.isShown &&
                <div className='modal-overlay' onClick={props.onClose}>
                    <div className='modal-wrapper' onClick={(e) => e.stopPropagation()}>
                        <div className='modal-content' style={{zIndex: props.zIndex || 1000 }}>
                            <form className='input-form'>
                                <input className='input text' type='text' placeholder='Имя задачи' value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
                                <input className='input data' type='date'
                                    value={`${date.getFullYear()}-${date.getMonth() > 8 ? date.getMonth()+1 : '0'+(date.getMonth()+1)}-${date.getDate() > 9 ? date.getDate() : '0'+date.getDate()}`}
                                    onChange={(e) => setDate(new Date(e.target.value))}
                                />
                                <div className='form-buttons'>
                                    <button type='reset' onClick={props.onClose}>Закрыть</button>
                                    <button type='submit' disabled={!isValid()} onClick={handleSubmit}>Создать</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )


}

export default Modal
