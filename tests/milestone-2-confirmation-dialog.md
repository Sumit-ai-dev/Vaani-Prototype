# 🧪 Milestone 2: Confirmation Dialog - Test Suite

**Milestone:** Trust Loop / Confirmation Dialog  
**Test Date:** 2026-01-23  
**Status:** Ready for Testing

---

## 📋 Test Checklist

### ✅ Pre-Test Setup

- [x] ConfirmationDialog component created
- [x] parse-intent API endpoint created
- [x] Hero component integrated with confirmation flow
- [x] Code committed and pushed
- [ ] Environment variables configured (`.env.local` with GEMINI_API_KEY)
- [ ] Application running locally (`npm run dev`)

---

## 🧪 Test Cases

### Test 1: Parse Intent API
**Objective:** Verify the parse-intent endpoint works correctly

**Steps:**
1. Start dev server: `npm run dev`
2. Open browser console (F12)
3. Run this JavaScript in console:
   ```javascript
   fetch('http://localhost:3001/api/parse-intent', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ prompt: 'Create a landing page for a coffee shop' })
   })
   .then(r => r.json())
   .then(data => console.log('AI Intent:', data.aiIntent));
   ```

**Expected Results:**
- [ ] API returns status 200
- [ ] Response has `success: true`
- [ ] `aiIntent` field contains text like: "I will create a landing page for a coffee shop with..."
- [ ] No errors in server console

**Status:** ⬜ Not Tested

---

### Test 2: Confirmation Dialog Visibility
**Objective:** Verify dialog appears when user submits input

**Steps:**
1. Open http://localhost:3001
2. Type in textarea: "Create a portfolio website"
3. Click the Send button (blue/purple gradient)
4. Wait 2-3 seconds

**Expected Results:**
- [ ] Send button shows spinning loader during processing
- [ ] Confirmation modal appears (dark overlay)
- [ ] Modal shows AI's understanding (starts with "I will create..." or similar)
- [ ] Two buttons visible: "Yes, that's correct!" (green) and "No, let me rephrase" (gray)
- [ ] Modal has nice animations (fade-in, zoom-in)

**Status:** ⬜ Not Tested

---

### Test 3: Voice Input → Confirmation
**Objective:** Verify voice input triggers confirmation dialog

**Steps:**
1. Click "Start Voice Input"
2. Allow microphone
3. Speak: "Create a blog website for cooking recipes"
4. Click "Stop Recording"
5. Verify text appears in textarea
6. Click Send button

**Expected Results:**
- [ ] Voice transcription appears in textarea
- [ ] Send button triggers parse-intent API
- [ ] Confirmation modal appears
- [ ] AI's understanding reflects what you spoke
- [ ] Modal text is accurate and specific

**Status:** ⬜ Not Tested

---

### Test 4: Confirm Action ("Yes" Button)
**Objective:** Verify "Yes" button proceeds to generation

**Steps:**
1. Type: "Create a simple landing page"
2. Click Send
3. Wait for confirmation modal
4. Click "Yes, that's correct!" button

**Expected Results:**
- [ ] Modal closes immediately
- [ ] App redirects to `/workspace/[id]` page
- [ ] Website generation begins
- [ ] Loading indicator appears
- [ ] (If Convex configured) Generated code appears

**Status:** ⬜ Not Tested

---

### Test 5: Reject Action ("No" Button)
**Objective:** Verify "No" button allows rephrasing

**Steps:**
1. Type: "Create a website"
2. Click Send
3. Wait for confirmation modal
4. Click "No, let me rephrase"

**Expected Results:**
- [ ] Modal closes
- [ ] Returns to main page
- [ ] Original text still in textarea (not cleared)
- [ ] User can edit the text
- [ ] Can click Send again to retry

**Status:** ⬜ Not Tested

---

### Test 6: AI Intent Accuracy
**Objective:** Verify AI correctly understands various prompts

**Test Prompts:**

| Input | Expected AI Understanding |
|-------|---------------------------|
| "portfolio website" | Should mention portfolio, projects, about section |
| "coffee shop landing page" | Should mention hero, menu, location, contact |
| "ecommerce site for handmade jewelry" | Should mention products, cart, checkout |
| "blog about travel" | Should mention blog posts, categories, authors |

**Steps:**
For each prompt above:
1. Type the input
2. Click Send
3. Read AI's understanding in modal

**Expected Results:**
- [ ] AI understanding is specific (not generic)
- [ ] AI mentions key sections/features
- [ ] Understanding makes sense for the prompt
- [ ] Language is clear and professional

**Status:** ⬜ Not Tested

---

### Test 7: Empty Input Handling
**Objective:** Verify empty input is handled gracefully

**Steps:**
1. Leave textarea empty
2. Click Send button

**Expected Results:**
- [ ] Nothing happens (no API call)
- [ ] No modal appears
- [ ] No errors in console
- [ ] UI remains responsive

**Status:** ⬜ Not Tested

---

### Test 8: Network Error Handling
**Objective:** Verify graceful degradation when API fails

**Steps:**
1. Stop the dev server
2. Refresh page
3. Type: "Create a website"
4. Click Send

**Expected Results:**
- [ ] App doesn't crash
- [ ] Shows loading spinner briefly
- [ ] Falls back to direct generation (if possible)
- [ ] Or shows error message
- [ ] User can retry after server restarts

**Status:** ⬜ Not Tested

---

### Test 9: Enhance Prompt → Confirmation
**Objective:** Verify enhanced prompts also show confirmation

**Steps:**
1. Type: "coffee shop"
2. Click wand button (✨ enhance)
3. Wait for enhanced prompt
4. Click Send button

**Expected Results:**
- [ ] Enhanced text appears in textarea
- [ ] Send button triggers parse-intent
- [ ] Confirmation shows understanding of enhanced prompt
- [ ] Can proceed with "Yes"

**Status:** ⬜ Not Tested

---

### Test 10: UI/UX Polish
**Objective:** Verify user experience is smooth

**Steps:**
1. Test full flow multiple times
2. Check animations
3. Test on mobile (if possible)

**Expected Results:**
- [ ] Modal animations smooth (300ms duration)
- [ ] Buttons have hover effects
- [ ] Modal is centered on screen
- [ ] Text is readable (good contrast)
- [ ] Mobile: Modal fits screen, buttons are touch-friendly
- [ ] No layout shifts or glitches
- [ ] Loading states clear and visible

**Status:** ⬜ Not Tested

---

## 🐛 Bug Tracking

| Bug ID | Description | Severity | Status | Fix |
|--------|-------------|----------|--------|-----|
| - | No bugs found yet | - | - | - |

---

## 📊 Test Results Summary

**Total Test Cases:** 10  
**Passed:** 0  
**Failed:** 0  
**Not Tested:** 10  
**Blocked:** 0  

**Pass Rate:** 0% (pending testing)

---

## 🚀 Testing Instructions

### Step 1: Ensure Milestone 1 Works

Make sure voice recording is working from Milestone 1.

### Step 2: Start Application

```bash
cd "/Users/sumitdas/Desktop/VAANI DEMO/ai-website-builder-base"
npm run dev
```

### Step 3: Open Browser

Navigate to http://localhost:3001

### Step 4: Run Tests

Follow test cases 1-10 above in order.

---

## 🎯 API Testing (Optional)

You can test the API directly using `curl`:

```bash
# Test parse-intent endpoint
curl -X POST http://localhost:3001/api/parse-intent \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a landing page for a coffee shop"}'
```

**Expected Output:**
```json
{
  "success": true,
  "aiIntent": "I will create a landing page for a coffee shop with...",
  "originalPrompt": "Create a landing page for a coffee shop"
}
```

---

## ✅ Sign-Off Criteria

Milestone 2 is **COMPLETE** when:
- [ ] All 10 test cases pass
- [ ] 0 critical bugs
- [ ] Confirmation dialog appears correctly
- [ ] "Yes" proceeds to generation
- [ ] "No" allows rephrasing
- [ ] AI intent is accurate and specific

---

## 📝 Integration with Milestone 1

**Combined Flow:**
```
Voice → Text (M1) → Parse Intent (M2) → Confirm (M2) → Generate
```

Make sure to test the full flow:
1. Use voice input (Milestone 1)
2. See transcription appear
3. Click Send
4. See confirmation (Milestone 2)
5. Click "Yes"
6. Website generates

---

## 🔗 Related Files

- Component: [`components/custom/ConfirmationDialog.jsx`](file:///Users/sumitdas/Desktop/VAANI%20DEMO/ai-website-builder-base/components/custom/ConfirmationDialog.jsx)
- API: [`app/api/parse-intent/route.js`](file:///Users/sumitdas/Desktop/VAANI%20DEMO/ai-website-builder-base/app/api/parse-intent/route.js)
- Integration: [`components/custom/Hero.jsx`](file:///Users/sumitdas/Desktop/VAANI%20DEMO/ai-website-builder-base/components/custom/Hero.jsx)

---

**Test Engineer:** AI Assistant  
**Review Status:** Awaiting user testing  
**Next Milestone:** Milestone 3 - Dashboard UI
