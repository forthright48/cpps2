import Model from '@/store/modules/Model'

const state = {
    classrooms: [],
}

const actions = {
    async fetchClassrooms(context) {
        const response = await this.Api.getClassrooms()
        context.commit('SET_CLASSROOMS', response.data)
    },
}

export default class Classrooms extends Model {
    constructor(Api) {
        super()
        this.Api = Api
        this.addState(state)
        this.addActions(actions)
    }
}
