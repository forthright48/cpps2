import Main from './main'
import Api from '@/api/classrooms'

const mutations = {
    ADD_CLASSROOM(context, value) {
        context.classrooms.push(value)
    },
}

class Student extends Main {
    constructor(Api) {
        super(Api)
        super.addMutations(mutations)
    }
}

export default new Student(Api)
