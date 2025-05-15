<template>
  <div class="app-body">

    <section class="full-bg app-head" :style="{ backgroundImage: `url(${getImage('app_head_bg.png')})` }">
      <div class="bg-content body-m">
        <h1>Hello Vue</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum autem consequatur at quae quasi
          quibusdam. Quae ullam asperiores corrupti temporibus quisquam vitae laboriosam.</p>
      </div>
    </section>

    <!-- 按钮 -->
    <section class="buttons body-m">
      <h2>Button</h2>
      <div class="buttons">
        <el-button type="primary">Primary</el-button>
        <el-button type="success" plain>Success</el-button>
        <el-button type="info" round>Info</el-button>
        <el-button type="warning" round>Warning</el-button>
        <el-button type="danger" :icon="Delete" circle />
        <el-button type="primary" disabled>Primary Disable</el-button>
        <el-button link> 链接 </el-button>
        <el-button type="primary" text>文字</el-button>
        <el-button size="large" :icon="Search">Search</el-button>

        <el-button color="#626aef">Default</el-button>
        <el-button color="#626aef" plain>Plain</el-button>

      </div>
    </section>

    <!-- menu折叠 -->
    <section class="menu body-m">
      <h2>Menu</h2>
      <el-menu :default-active="state.menuIdx" class="el-menu-demo" mode="horizontal" @select="menuHandleSelect"
        active-text-color="#ffd04b" background-color="#545c64" text-color="#fff">
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3" disabled>Info</el-menu-item>
        <el-menu-item index="4">Orders</el-menu-item>
      </el-menu>
      <el-menu :default-active="state.menuIdx" class="el-menu-demo" mode="vertical" @select="menuHandleSelect"
        style="padding-top: 2rem;">
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3" disabled>Info</el-menu-item>
        <el-menu-item index="4">Orders</el-menu-item>
      </el-menu>
    </section>

    <!-- 表单 -->
    <section class="form body-m">
      <h2>Form</h2>
      <el-form label-position="top" label-width="100px">
        <el-form-item label="Name">
          <el-input v-model="state.formName" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-input v-model="state.formRegion" />
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input v-model="state.formType" />
        </el-form-item>
        <el-form-item class="form-buttons">
          <el-button type="primary">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </section>

    <!-- collapse -->
    <section class="collapse body-m">
      <h2>collapse</h2>
      <el-collapse v-model="state.activeCollapse">
        <el-collapse-item title="Consistency" name="1">
          <div>
            Consistent with real life: in line with the process and logic of real
            life, and comply with languages and habits that the users are used to;
          </div>
          <div>
            Consistent within interface: all elements should be consistent, such
            as: design style, icons and texts, position of elements, etc.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Feedback" name="2">
          <div>
            Operation feedback: enable the users to clearly perceive their
            operations by style updates and interactive effects;
          </div>
          <div>
            Visual feedback: reflect current state by updating or rearranging
            elements of the page.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Efficiency" name="3">
          <div>
            Simplify the process: keep operating process simple and intuitive;
          </div>
          <div>
            Definite and clear: enunciate your intentions clearly so that the
            users can quickly understand and make decisions;
          </div>
          <div>
            Easy to identify: the interface should be straightforward, which helps
            the users to identify and frees them from memorizing and recalling.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Controllability" name="4">
          <div>
            Decision making: giving advices about operations is acceptable, but do
            not make decisions for the users;
          </div>
          <div>
            Controlled consequences: users should be granted the freedom to
            operate, including canceling, aborting or terminating current
            operation.
          </div>
        </el-collapse-item>
      </el-collapse>
    </section>
  </div>
</template>

<script setup lang="ts" name="App">

import { Delete, Search } from '@element-plus/icons-vue'
import { reactive } from 'vue';
import { getImage } from './Utils/pubUse';

const state = reactive({
  formName: '',
  formRegion: '',
  formType: '',

  activeCollapse: 1,

  menuIdx: "1",
  menuIdx2: 0
})

const menuHandleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style scoped lang="scss">
.app-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 4rem;
}

.app-head {
  // height: 100vh;
  aspect-ratio: 16/9;

  display: flex;
  align-items: center;
  justify-content: center;

  .bg-content {
    color: white;
    h1 {
      text-shadow: none;
    }
  }
}

h2 {
  text-align: left;
  padding-bottom: 1rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.menu {

  :deep(.el-menu--horizontal) {
    // li {
    //   padding: 0;
    // }

    .el-sub-menu {
      &.is-active {
        .el-sub-menu__title {
          border-bottom-color: transparent;
        }
      }
    }

    .el-menu-item {
      &.is-active {
        border-bottom-color: transparent;
        background-color: transparent;
      }
    }
  }

  :deep(.el-menu--vertical) {
    border: none;
  }
}
</style>