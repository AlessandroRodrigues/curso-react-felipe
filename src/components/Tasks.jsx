import { ChevronRightIcon, TrashIcon, CheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import  Button from "./Button";
import { useContext } from "react";
import TemaContext from "../infrastructure/tema/TemaContext";
import { bgColors200, bgColors400 } from "../infrastructure/tema/Temas";

function Tasks({tasks, onTaskClick, onDeleteTaskClick}){
    const navigate = useNavigate();
    const { tema } = useContext(TemaContext);

    function onSeeDetailsClick(task){
        const query = new URLSearchParams();
        query.set("title", task.title);
        query.set("description", task.description);
        navigate(`/task?${query.toString()}`);
    }

    return (
        <ul className={`space-y-4 p-6 ${bgColors200[tema]} rounded-md shadow`}>
            {tasks.map(task => 
                <li key={task.id} className="flex gap-2">
                    <button 
                        onClick={() => onTaskClick(task.id)}
                        className={`${bgColors400[tema]} text-white p-2 rounded-md w-full flex gap-2 text-left`}>
                        {task.completed && <CheckIcon/> }        
                        {task.title} {tema}
                    </button>
                    <Button 
                        onClick={() => onSeeDetailsClick(task)}>
                        <ChevronRightIcon/>
                    </Button>
                    <Button 
                        onClick={() => onDeleteTaskClick(task.id)}>
                        <TrashIcon/>
                    </Button>
                </li>
            )}
        </ul>
    );
}

export default Tasks;