# Localization Contribution Guide

Thank you for your interest in contributing translations to Claude Code Router! This guide will help you add support for new languages or improve existing translations.

## 🌍 Current Languages

- English (en) - Default
- Chinese (zh)

## 📝 How to Contribute a New Language

### 1. Create Language Files

1. Navigate to `src/locales/` directory
2. Create a new JSON file named with your language code (e.g., `ja.json` for Japanese, `es.json` for Spanish)
3. Copy the structure from `en.json` as a template
4. Translate all the strings to your target language

### 2. Language File Structure

```json
{
  "cli": {
    "help": {
      "usage": "Usage string in your language",
      "description": "Description in your language",
      "commands": {
        "title": "Commands title in your language",
        // ... more command descriptions
      }
    },
    "messages": {
      // Status and error messages
    }
  },
  "status": {
    // Status display strings
  },
  // ... other sections
}
```

### 3. Register Your Language

Edit `src/i18n.ts` to add your language:

```typescript
// Add your language code to the array
['en', 'zh', 'YOUR_LANGUAGE_CODE'].forEach(lang => {
  // ... existing code
});
```

### 4. Update Documentation

1. Update README.md to list your language in the "Language Support" section
2. If possible, create a translated README in your language (e.g., `README_ja.md`)

## 🔍 Translation Guidelines

1. **Keep placeholders**: Don't translate variable placeholders like `${variable}`
2. **Maintain formatting**: Preserve spacing, line breaks, and punctuation
3. **Be consistent**: Use consistent terminology throughout the translation
4. **Consider context**: Some technical terms may not need translation
5. **Test your translations**: Run the application with your language to ensure everything displays correctly

## 🧪 Testing Your Translation

1. Build the project:
   ```bash
   npm run build
   ```

2. Test with your language:
   ```bash
   export CLAUDE_ROUTER_LANG=YOUR_LANGUAGE_CODE
   node dist/cli.js --help
   node dist/cli.js status
   ```

3. Verify all commands and messages appear correctly

## 📤 Submitting Your Translation

1. Fork the repository
2. Create a new branch: `git checkout -b add-LANGUAGE-translation`
3. Add your translation files
4. Commit your changes: `git commit -m "Add LANGUAGE translation"`
5. Push to your fork: `git push origin add-LANGUAGE-translation`
6. Create a Pull Request with:
   - Title: "Add [Language Name] translation"
   - Description: Brief explanation of your translation
   - Screenshots of the translated interface (if possible)

## 🤝 Translation Review Process

1. Native speakers will review the translation for accuracy
2. Technical accuracy will be verified
3. The translation will be tested in the actual application
4. Once approved, it will be merged and included in the next release

## 💬 Need Help?

If you have questions about translations or need clarification on any strings, please:
- Open an issue with the "translation" label
- Ask in the discussions section
- Contact the maintainers

Thank you for helping make Claude Code Router accessible to more users worldwide! 🌏