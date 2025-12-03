<template>
  <div class="family-home">
    <div class="home-header">
      <h1>Family Group</h1>
      <p>A private family Group</p>
    </div>
    
    <div class="family-members-grid">
      <div 
        v-for="member in familyMembers" 
        :key="member.id"
        class="member-card"
        @click="navigateToProfile(member.id)"
      >
        <div class="member-image-container">
          <img :src="member.profileImage" :alt="member.name" class="member-image">
        </div>
        <div class="member-info">
          <h3>{{ member.name }}</h3>
          <p class="role">{{ member.role }}</p>
        </div>
        <div class="member-overlay">
          <span>View Profile</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { familyMembers } from '../data/familyData'
import { useRouter } from 'vue-router'
import '../styles/FamilyHome.css'

export default {
  name: 'FamilyHome',
  setup() {
    const router = useRouter()

    const navigateToProfile = (memberId) => {
      router.push(`/profile/${memberId}`)
    }

    return {
      familyMembers,
      navigateToProfile
    }
  }
}
</script>


