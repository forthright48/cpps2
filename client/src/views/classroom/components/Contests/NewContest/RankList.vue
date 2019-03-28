<template>
    <div>
        <draggable v-model="students" @change="handleChange">
            <div v-for="student in students" :key="student._id" class="list-item">
                <el-card class="box-card">
                <el-row>
                    <el-col :span="4" class="highlight-lg">{{student.position}}</el-col>
                    <el-col :span="7" class="highlight-lg">{{student.username}}</el-col>
                    <el-col :span="4" class="highlight-md">
                        <span class="current-rating">
                            <del>
                                {{student.currentRating}}
                            </del>
                        </span>
                    </el-col>
                    <el-col :span="2">
                        <fa-icon name="arrow-right" />
                    </el-col>
                    <el-col :span="6" class="highlight-md">
                        <span class="new-rating">
                            {{student.newRating}} &nbsp;
                            <span style="font-size:14px">&Delta; {{student.delta}}</span>
                        </span>
                    </el-col>
                    <el-col :span="1"><i class="el-icon-sort" /></el-col>
                </el-row>
                </el-card>
            </div>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { getNewRatings } from 'codeforces-rating-system'

export default {
    components: {
        draggable,
    },

    props: [
        'initialRatings',
    ],

    data() {
        return {
            students: [],
        }
    },

    mounted() {
        const students = []

        for (const userId in this.initialRatings) {
            const student = this.initialRatings[userId]
            students.push({
                ...student,
                userId: student._id,
                previousRating: student.currentRating,
            })
        }

        students.sort((a, b) => {
            return b.currentRating - a.currentRating
        })

        this.students = students
        this.handleChange()
    },

    methods: {
        calculatePosition() {
            for (let i = 0; i < this.students.length; i++) {
                this.students[i].position = i + 1
            }
        },

        calculateNewRatings() {
            this.students = getNewRatings(this.students)
        },

        handleChange() {
            this.calculatePosition()
            this.calculateNewRatings()
            this.$emit('change', this.students)
        },
    },
}
</script>

<style lang="scss" scoped>
.highlight-lg {
    font-size: 30px;
}
.highlight-md {
    font-size: 20px;
}
.list-item {
    margin-top: 10px;
    cursor: move;
}
.current-rating {
    color: red;
}
.new-rating {
    color: green;
}
</style>
