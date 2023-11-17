import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Képzeljük el, hogy ezek az alap komponensek, amiket a felhasználók a kezdőlapra húzhatnak
const components = [
    { id: 'header', content: 'Fejléc' },
    { id: 'image-slider', content: 'Képsor' },
    { id: 'text-block', content: 'Szövegblokk' },
    { id: 'footer', content: 'Lábléc' },
    // További elemek
];
interface PageComponent {
    id: string;
    content: string;
}
const FrontPageDesigner = () => {
    const [pageComponents, setPageComponents] = useState<PageComponent[]>([]);

    // A drag and drop logika kezelése
    // @ts-ignore
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const newPageComponents = Array.from(pageComponents);
        const [relocatedComponent] = newPageComponents.splice(result.source.index, 1);
        newPageComponents.splice(result.destination.index, 0, relocatedComponent);

        setPageComponents(newPageComponents);
    };

    // Ez a függvény kezeli az új elemek hozzáadását a kezdőlaphoz
    // @ts-ignore
    const addComponentToPage = (component) => {
        setPageComponents([...pageComponents, component]);
    };

    return (
        <div className="flex text-center"   style={{ height: '78vh', width: '120vh'}}>
            <div className="w-1/4 p-4 bg-gray-300 dark:bg-gray-600">
                {components.map((component) => (
                    <div
                        key={component.id}
                        onClick={() => addComponentToPage(component)}
                        className="p-2 my-2 bg-white shadow cursor-pointer hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-500"
                    >
                        {component.content}
                    </div>
                ))}
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-page">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="w-3/4 p-4 bg-white dark:bg-gray-700"
                        >
                            {pageComponents.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="p-2 my-2 bg-gray-100 dark:bg-gray-500 shadow"
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default FrontPageDesigner;
