import store from '../store/index'

export function readyDrag(event, currentCard, currentColumn, otherColumn, currentColumnClass, otherColumnClass, block, side,) {
       
    const position = Array.from(currentColumn.children).indexOf(currentCard);

    const width = currentCard.offsetWidth

    let shiftX = event.clientX - currentCard.getBoundingClientRect().left;
    let shiftY = event.clientY - currentCard.getBoundingClientRect().top;
    currentCard.classList.add('move')
    document.body.append(currentCard);
  
    moveAt(event.pageX, event.pageY);
  
    function moveAt(pageX, pageY) {
        currentCard.style.left = pageX - shiftX + "px";
        currentCard.style.top = pageY - shiftY + "px";
        currentCard.style.width = width + "px";
    }
  
    // потенциальная цель переноса, над которой мы пролетаем прямо сейчас
    let currentDroppable = null;
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
      currentCard.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      currentCard.hidden = false;
      if (!elemBelow) return;
  
      let droppableBelow = elemBelow.closest(`.${otherColumnClass}`);
  
      if (currentDroppable != droppableBelow) {
        // мы либо залетаем на цель, либо улетаем из неё
  
        if (currentDroppable) {
          // логика обработки процесса "вылета" из droppable (удаляем подсветку)
          otherColumn.classList.remove('in-target')
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // логика обработки процесса, когда мы "влетаем" в элемент droppable
          otherColumn.classList.add('in-target')
        } 
      }
    }
  
    document.addEventListener("mousemove", onMouseMove);
  
    currentCard.addEventListener("mouseup", () => {
   
      if (currentDroppable === null || currentDroppable.classList.contains(currentColumnClass)) {
        const referenceElement = currentColumn.children[position];
        currentColumn.insertBefore(currentCard, referenceElement);
        resetStyle()
      }
      if (currentDroppable !== null && currentDroppable.classList.contains(otherColumnClass)) {
        otherColumn.classList.remove('in-target')
        store.commit('changeContainer', {
            block: side,
            id: block.id,
          })
        currentCard.remove()
      }
    
      document.removeEventListener("mousemove", onMouseMove);
      currentCard.onmouseup = null;
    });

    function resetStyle() {
        currentCard.style.left = "unset";
        currentCard.style.top = "unset";
        currentCard.classList.remove('move')
    }
  }