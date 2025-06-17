
# QFLOW End-to-End Testing Plan

## Test User Account
**Primary Test User**: aviadn777@gmail.com
- **Role**: Business Owner
- **Language**: Hebrew/English (bilingual testing)
- **Status**: Verified user in system

## COMPREHENSIVE E2E TEST FLOWS

### FLOW 1: COMPLETE USER JOURNEY (Authentication → Discovery → Booking)
**Duration**: 45 minutes
**Priority**: CRITICAL

#### Step 1.1: Authentication Flow
```
1. Navigate to: https://[app-url]/
2. Click "הצטרף" (Join) button
3. Test Signup Wizard:
   - Select "Business Owner" 
   - Fill form with test data
   - Complete wizard flow
   - Verify success modal
4. Test Login:
   - Use aviadn777@gmail.com credentials
   - Verify user avatar appears
   - Check dropdown menu functionality
5. Test Session Persistence:
   - Refresh page
   - Verify user remains logged in
   - Test logout functionality
```

#### Step 1.2: Business Discovery Flow
```
6. Navigate to: /discovery
7. Test Welcome Hero:
   - Verify time-based greeting
   - Click interactive elements (💄, 💅, ✨)
   - Confirm heart counter increases
8. Test Search System:
   - Type "תל אביב" in search
   - Click search suggestions
   - Test voice search (Chrome only)
   - Verify results filter correctly
9. Test Filter System:
   - Apply location filter: "תל אביב"
   - Apply business type: "מספרות"
   - Adjust price range: ₪50-₪150
   - Set rating filter: 4.5+
   - Test filter combinations
   - Verify "Clear Filters" works
10. Test Business Cards:
    - Hover over business cards
    - Click heart icons (collect hearts)
    - Test "קבע תור" (Book Now) buttons
    - Test "צפה בפרופיל" (View Profile) buttons
```

#### Step 1.3: Gamification Testing
```
11. Heart Collection System:
    - Start with 0 hearts
    - Perform 10 different interactions
    - Verify heart counter updates
    - Check achievement progress
12. Achievement System:
    - Reach 5 hearts → "Salon Explorer"
    - Reach 15 hearts → "Beauty Expert"  
    - Reach 30 hearts → "Loyal Customer"
    - Verify achievement unlocks
    - Check visual feedback
```

### FLOW 2: MULTI-LANGUAGE TESTING
**Duration**: 30 minutes
**Priority**: HIGH

#### Step 2.1: Hebrew Interface Testing
```
1. Set language to Hebrew
2. Verify RTL layout
3. Check Hebrew font rendering
4. Test all navigation labels
5. Verify business names display (name_he)
6. Test form validation messages
7. Check time-based greetings in Hebrew
```

#### Step 2.2: English Interface Testing
```
8. Switch to English
9. Verify LTR layout
10. Check font changes to Inter
11. Test all UI components in English
12. Verify business names fallback to English
13. Test search in English
14. Verify filter labels translation
```

### FLOW 3: RESPONSIVE DESIGN TESTING
**Duration**: 40 minutes
**Priority**: HIGH

#### Step 3.1: Mobile Testing (iPhone 12 Pro - 390×844)
```
1. Open /discovery on mobile
2. Test touch interactions:
   - Tap search input
   - Use mobile filters
   - Swipe through business cards
   - Test mobile navigation menu
3. Verify single-column layout
4. Check touch target sizes
5. Test mobile search suggestions
```

#### Step 3.2: Tablet Testing (iPad - 768×1024)
```
6. Test portrait mode layout
7. Test landscape mode layout
8. Verify two-column grid
9. Test sidebar filters on tablet
10. Check touch and hover interactions
```

#### Step 3.3: Desktop Testing (1920×1080)
```
11. Test full desktop layout
12. Verify three-column business grid
13. Test hover effects
14. Check sidebar filter functionality
15. Test keyboard navigation
```

### FLOW 4: PERFORMANCE & ERROR TESTING
**Duration**: 25 minutes
**Priority**: MEDIUM

#### Step 4.1: Performance Metrics
```
1. Measure initial page load (target: <3s)
2. Test filter response times
3. Test search input lag
4. Monitor heart animation performance
5. Check smooth scrolling
```

#### Step 4.2: Error Handling
```
6. Test offline functionality:
   - Disable network
   - Verify error messages
7. Test invalid searches:
   - Enter very long search terms
   - Test special characters
8. Test filter edge cases:
   - Extreme price ranges
   - Invalid combinations
```

### FLOW 5: DATA INTEGRATION TESTING
**Duration**: 20 minutes
**Priority**: HIGH

#### Step 5.1: Supabase Connection
```
1. Verify businesses data loads
2. Check services data integration
3. Test user_profiles table access
4. Verify RLS policies work
5. Test query performance with filters
```

#### Step 5.2: Data Accuracy
```
6. Verify business information accuracy:
   - Names (Hebrew & English)
   - Addresses and cities
   - Price ranges calculation
   - Service counts
7. Check mock data consistency:
   - Ratings (4.5-4.9 range)
   - Review counts (50-150)
   - Availability status
```

## TESTING EXECUTION CHECKLIST

### Pre-Testing Setup ✓
- [ ] Verify Supabase connection active
- [ ] Confirm test user aviadn777@gmail.com exists
- [ ] Clear browser cache and cookies
- [ ] Prepare testing devices/browsers
- [ ] Open Developer Tools for console monitoring

### Browser Compatibility Matrix ✓
| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Authentication | ☐ | ☐ | ☐ | ☐ |
| Business Discovery | ☐ | ☐ | ☐ | ☐ |
| Search & Filters | ☐ | ☐ | ☐ | ☐ |
| Language Switching | ☐ | ☐ | ☐ | ☐ |
| Gamification | ☐ | ☐ | ☐ | ☐ |
| Mobile Layout | ☐ | ☐ | ☐ | ☐ |

### Critical User Flows ✓
- [ ] **FLOW 1**: Complete User Journey (45 min)
- [ ] **FLOW 2**: Multi-Language Testing (30 min)
- [ ] **FLOW 3**: Responsive Design Testing (40 min)
- [ ] **FLOW 4**: Performance & Error Testing (25 min)
- [ ] **FLOW 5**: Data Integration Testing (20 min)

**Total Testing Time: ~2.5 hours**

## BUG REPORTING TEMPLATE
```
**Bug ID**: BUG-YYYY-MM-DD-###
**Title**: Brief description
**Priority**: High/Medium/Low
**Browser**: Chrome/Firefox/Safari/Edge
**Device**: Desktop/Mobile/Tablet
**User**: aviadn777@gmail.com
**Flow**: Which test flow
**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three
**Expected Result**: What should happen
**Actual Result**: What actually happens
**Console Errors**: [Any JavaScript errors]
**Screenshots**: [Attach visual evidence]
**Environment**: [Production/Staging URL]
```

## PASS/FAIL CRITERIA

### CRITICAL (Must Pass for Release)
- User authentication works completely
- Business discovery page loads with data
- Search and filters function correctly
- Language switching works
- Mobile layout is fully functional
- No critical JavaScript errors in console

### HIGH PRIORITY (Should Pass)
- All gamification features work
- Smooth animations and interactions
- Cross-browser compatibility
- Performance targets met
- Error handling works gracefully

### MEDIUM PRIORITY (Nice to Have)
- Voice search functions
- Advanced filter combinations
- Perfect mobile touch interactions
- Achievement system fully functional

## TEST COMPLETION REPORT
After completing all flows, generate:
1. **Summary Statistics**: Pass/Fail counts
2. **Critical Issues**: High-priority bugs found
3. **Browser Compatibility**: Matrix completion
4. **Performance Metrics**: Load times and responsiveness
5. **User Experience Notes**: Observations and recommendations

---

**Next Steps After E2E Testing:**
1. Address all critical and high-priority bugs
2. Re-test failed scenarios
3. Perform regression testing
4. Document known limitations
5. Sign off for production deployment
