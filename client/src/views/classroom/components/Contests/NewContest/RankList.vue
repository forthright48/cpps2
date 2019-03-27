<template>
    <div>
        <draggable v-model="students" @change="handleChange">
            <div v-for="student in students" :key="student._id" class="list-item">
                <el-card class="box-card">
                <el-row>
                    <el-col :span="4" style="font-size:30px;">{{student.index}}</el-col>
                    <el-col :span="19">{{student.username}}</el-col>
                    <el-col :span="1"><i class="el-icon-sort" /></el-col>
                </el-row>
                </el-card>
            </div>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable,
    },

    props: [
        'initialRank',
    ],

    data() {
        return {
            students: [],
        }
    },

    mounted() {
        let index = 1
        for (const userId in this.initialRank) {
            const student = this.initialRank[userId]
            this.students.push({
                index,
                ...student,
            })
            index++
        }

        this.handleChange()
    },

    methods: {
        calculateIndex() {
            for (let i = 0; i < this.students.length; i++) {
                this.students[i].index = i + 1
            }
        },

        handleChange() {
            this.calculateIndex()
            this.$emit('change', this.students)
        },
    },
}
</script>

<style lang="scss" scoped>
.list-item {
    margin-top: 10px;
    cursor: move;
}
</style>
