<template>
  <div class="debit">
    <h3>Danh sách nợ</h3>
    <form @submit.prevent="addDebit">
      <div class="field has-addons mb-4">
        <div class="control">
          <input v-model="newDebitContent"
           class="input" type="text" placeholder="Thêm tên tại đây">

        </div>
        <div class="control">
          <button :disabled="!newDebitContent"
           class="button is-info">
            Thêm
          </button>
        </div>
      </div>
    </form>
    <div class="card mt-2" v-for='debit in debits'>
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">{{debit.content}} - {{debit.date}} - {{debit.time}}</div>
            <div class="column is-1 has-text-right"> 
              <button @click="deleteDebit(debit.id)"
               class="button is-danger">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
  @import 'bulma/css/bulma.min.css';
  .debit{
    max-width: 800px;
    margin: auto;
  }
  h3{
    text-align: center;
    font-size: 24px;
    line-height: 48px;
    font-weight: 800;
  }
  .field.has-addons .control[data-v-7a7a37b1]:not(:last-child){
    width: 100%;
  }
</style>

<script setup>
  import {ref, onMounted} from 'vue';
  import { v4 as uuidv4 } from 'uuid';
  import { collection, onSnapshot, addDoc , deleteDoc , doc } from "firebase/firestore";
  import {db} from '@/firebase'

  const debitsCollectionRef = collection(db,"debits")
  const debits = ref([])

  const newDebitContent = ref('')

  const addDebit = ()=>{
    addDoc(debitsCollectionRef, {
      content: newDebitContent.value,
      date: new Date().toISOString().slice(0,10),
      time: new Date().toLocaleTimeString(),
      done: false
    });
  }

  const deleteDebit = id =>{
    if(confirm("Thật sự muốn xóa con nợ")){
       deleteDoc(doc(debitsCollectionRef, id));
    }
    
  }

  onMounted(async () => {
    onSnapshot(debitsCollectionRef, (querySnapshot) => {
      const fbDebits = [];
      querySnapshot.forEach((doc) => {
        const debitData = {
        id: doc.id,
        content: doc.data().content,
        date : doc.data().date,
        time : doc.data().time,
        done : doc.data().done
      }
        fbDebits.push(debitData)
      });
      debits.value = fbDebits

    });
  })


 
</script>