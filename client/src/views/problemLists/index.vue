<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header">
                <h3>Problem Lists</h3>
            </div>
            <ProblemLists />
        </el-card>
    </div>
</template>

<script>
import ProblemLists from './components/problemLists'
export default {
    components: {
        ProblemLists,
    },
}
</script>
