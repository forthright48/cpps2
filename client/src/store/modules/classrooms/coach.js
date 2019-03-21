import Main from './main'
import Api from '@/api/classrooms'

const actions = {
    async createNewClassroom(context, name) {
        const response = await this.Api.createClassroom(name)
        context.commit('ADD_CLASSROOM', response.data)
    },
}

class Coach extends Main {
    constructor(Api) {
        super(Api)
        super.addActions(actions)
    }
}

export default new Coach(Api)
