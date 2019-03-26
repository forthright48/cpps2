import pluralize from 'pluralize'

export default class Model {
    constructor() {
        this.namespaced = true
        this.state = {}
        this.mutations = {}
        this.actions = {}
        this.getters = {}
    }

    addState(state) {
        this.state = {
            ...this.state,
            ...state,
        }
        this.generateMutations()
    }

    /**
     * Auto generate mutations from state
     */
    generateMutations() {
        const mutations = {}
        for (const key in this.state) {
            let mutationName = 'SET_' + key.toUpperCase()
            mutations[mutationName] = function(context, value) {
                context[key] = value
            }

            if (Array.isArray(this.state[key])) {
                mutationName = 'ADD_' + pluralize.singular(key).toUpperCase()
                mutations[mutationName] = function(context, value) {
                    context[key].push(value)
                }
            }
        }

        this.addMutations(mutations)
    }

    addMutations(mutations) {
        this.mutations = {
            ...this.mutations,
            ...mutations,
        }
    }

    addActions(actions) {
        for (const idx in actions) {
            actions[idx] = actions[idx].bind(this)
        }
        this.actions = {
            ...this.actions,
            ...actions,
        }
    }
}
