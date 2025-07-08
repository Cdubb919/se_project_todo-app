class Section {
    constructor({ items, renderer, containerSelector }) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderitems() {
        this._items.forEach((items) => {
            const itemElement = this._renderer(items);
            const deleteButton = itemElement.querySelector('.delete-button');
        });

        deleteButton.addEventListener('click', () => {
            this._deleteItem(index);
        });

        this._container.appendChild(itemElement);

        _deleteItem(index)
        this._items.splice(index, 1);

        const itemElement = this._container.children[index];
        itemElement.remove();
    };

    addItem(element) {

    };
};

export default Section;