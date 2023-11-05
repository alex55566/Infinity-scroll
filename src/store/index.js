import { createStore } from 'vuex'
import { getRandomNumber } from '../helpers/helpers'
import { nanoid } from 'nanoid'

export default createStore({
    state: {
        leftBlock: [],
        rightBlock: [],
       
        quantityItem: 20000,
        step: 50,
       
        leftStepPrev: 0,
        leftStepNext: 50,

        rightStepPrev: 0,
        rightStepNext: 50,
        
        leftColumn: null,
        rightColumn: null,

        leftLoader: null,
        rightLoader: null,
        
        leftIteration: 0,
        rightIteration: 0,
   
    },
    mutations: {
        initBlocks(state) {
            for (let i = 0; i < state.quantityItem; i++) {
                const idx = getRandomNumber(1,12)
                i < state.quantityItem / 2 ? 
                state.leftBlock.push({
                    id: nanoid(),
                    price: Math.round(i * Math.random().toFixed(2)),
                    lvl: i,
                    pic: idx

                }) :
                state.rightBlock.push({
                    id: nanoid(),
                    price: Math.round(i * Math.random().toFixed(2)),
                    lvl: i,
                    pic: idx
                })
            }
        },
        changeContainer(state, payload) {
            const { block, id} = payload
            const clickedItem = block === 'left' ? state.leftBlock.find(item => item.id === id) : state.rightBlock.find(item => item.id === id)
            block === 'left' ? state.leftBlock = state.leftBlock.filter(item => item.id !== id) : state.rightBlock = state.rightBlock.filter(item => item.id !== id)
            block === 'left' ?  state.rightBlock.unshift(clickedItem) : state.leftBlock.unshift(clickedItem)
        },
        initLeftColumn(state,payload) {
            state.leftColumn = payload
        },
        initRightColumn(state,payload) {
            state.rightColumn = payload
        },
        initLeftCards(state,payload) {
            state.leftCards = payload
        },
        initRightCards(state,payload) {
            state.rightCards = payload
        },
        initLeftLoader(state,payload) {
            state.leftLoader = payload
        },
        initRightLoader(state,payload) {
            state.rightLoader = payload
        },
        //имитация лоадера (типа у нас асинхронный запрос)
        initLoader(state, payload) {
            state[`${payload}Loader`].classList.add('visible')
            setTimeout(() => {
                state[`${payload}Loader`].classList.remove('visible')
            }, 500);
        },
        doScroll(state, payload) {
            const column = payload === 'left' ? state.leftColumn : state.rightColumn
            if (column.clientHeight + column.scrollTop >= column.scrollHeight) {
                state[`${payload}StepNext`]  +=state.step
                if (state[`${payload}Iteration`] > 0) state[`${payload}StepPrev`]+=state.step
                state[`${payload}Iteration`] +=1
                this.commit('initLoader', payload)
            }
            if (column.scrollTop === 0) {
                state[`${payload}Iteration`] === 0
                ? state[`${payload}Iteration`]
                : state[`${payload}Iteration`] -= 1
                if (state[`${payload}Iteration`] > 0) {
                    state[`${payload}StepNext`] -= state.step;
                    column.scrollTop += 5
                    state[`${payload}StepPrev`] -= state.step;
                    this.commit('initLoader', payload)
                }
                if (state[`${payload}Iteration`] === 0) {
                    state[`${payload}StepNext`] = state.step;
                }
             
            }
        },
    }
    
})