import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        body: null,
        container: null,
        headerBlock: null,
        havBlock: null,
        btnBurger: null,
        popup: null,
        popupClose: null,
        tabletWidth: 1024,
        isLoad: false,
        isError: false,
        data: null,
    },
    mutations: {
        addHeader(state, payload) {
            state.headerBlock = payload
        },
        addNav(state, payload) {
            state.havBlock = payload
        },
        addBtnBurger(state, payload) {
            state.btnBurger = payload
            console.log(state.btnBurger)
        },
        addPopup(state, payload) {
            state.popup = payload
        },
        addPopupClose(state, payload) {
            state.popupClose = payload
        },
        addContainer(state, payload) {
            state.container = payload
        },
        addBody(state) {
            state.body = document.querySelector('body')
        },
        initOnScroll(state) {
            console.log(state.headerBlock)
            document.addEventListener('scroll', () => {
                if (window.innerWidth > state.tabletWidth) {
                    if (window.scrollY !== 0) {
                        state.headerBlock.style.top = -state.havBlock.offsetHeight + 'px'
                    }
                    else {
                        state.headerBlock.style.top = '0px'
                    }
                }
              
            })
        },
        initOpenClosePopup(state) {
            console.log(state.btnBurger)
            state.btnBurger.addEventListener('click', () => {
                this.commit('setPadding')
                requestAnimationFrame(() => {
                    state.popup.classList.add('active')
                })
                state.popup.classList.add('showen')
                state.body.style.overflow = 'hidden'
            })
            state.popupClose.addEventListener('click', () => {
                this.commit('closePopup')
            })
            document.addEventListener('keydown', (e) => {
                if (e.keyCode === 27) {
                    if (state.popup.classList.contains('active')) {
                        this.commit('closePopup')
                    }
                }
            })
        },
        setPadding(state) {
            const lockPadding = window.innerWidth - state.container.offsetWidth + 'px'
            state.body.style.paddingRight = lockPadding
        },
        unsetPadding(state, el) {
            el.classList.remove('active')
            state.body.style.overflow = 'unset'
            state.body.style.paddingRight = '0px'
        },
        toggleTwoClasses(state, {element, first, second, timeOfAnimation}) {
            console.log(element)
            if (!element.classList.contains(first)) {
                element.classList.add(first);
                element.classList.remove(second);
            } else {
                element.classList.add(second);
                window.setTimeout(function () {
                    element.classList.remove(first);
                }, timeOfAnimation);
            }
        },
        closePopupClick(state) {
            this.commit('closePopup')
        },
        closePopup(state) {
            this.commit('toggleTwoClasses', {element: state.popup, first: 'showen', second: 'hidden', timeOfAnimation: 700})
            this.commit('unsetPadding', state.popup)
        },
        checkStatePopup(state) {
            if (innerWidth > state.tabletWidth) this.commit('closePopup')
        },
        showLoader(state, load) {
            state.isLoad = load
        },
        showError(state) {
        state.isError = true;
            setTimeout(() => {
                state.isError = false
            },2000)
        },
        addData(state, payload) {
            state.data = payload
            console.log(payload)
        }
    },
    actions: {
        getData(context, payload) {
            console.log(payload)
            context.commit('showLoader', true)
              axios
              .get(
                `http://localhost:3001/pages?path=${payload}`
              )
              .then((response) => {
                context.commit('addData', response.data)
              })
              .catch(() =>  context.commit('showError'))
              .finally(() => {
                context.commit('showLoader', false)
              });
          },
    } 
})