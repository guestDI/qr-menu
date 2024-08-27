#!/bin/bash

# Define the function to call ChatGPT API for translation
translate() {
  local text="$1"
  local target_lang="$2"
  request_data=$(jq -n \
                   --arg text "$text" \
                   --arg language "$target_lang" \
                   '{
                     "model": "gpt-4o",
                     "tools": [
                       {
                         "type": "function",
                         "function": {
                           "name": "sendTranslatedText",
                           "description": ("Be a professional translator - translate text to \($language)"),
                           "parameters": {
                             "type": "object",
                             "properties": {
                               "translatedText": {
                                 "type": "string",
                                 "description": "translated text"
                               }
                             }
                           }
                         }
                       }
                     ],
                     "tool_choice": {
                       "type": "function",
                       "function": {
                         "name": "sendTranslatedText"
                       }
                     },
                     "messages": [
                       {
                         "role": "user",
                         "content": "\($text)"
                       }
                     ]
                   }')
  # Placeholder for the actual API call, replace <API_KEY> and <API_URL> with actual values
  response=$(curl -s -X POST "https://api.openai.com/v1/chat/completions" \
      -H "Authorization: Bearer PUT_YOUR_CHATGPT_API_KEY_HERE" \
      -H "Content-Type: application/json" \
      --data "$request_data")

  translated_text=$(echo "$response" | jq -r '.choices[0].message.tool_calls[0].function.arguments' | jq -r '.translatedText')
  echo "$translated_text"
}

# Compare en.json with en.json.lock
changed_keys=$(jq --argfile a en.json --argfile b en.json.lock -n '$a | to_entries | map(select(.value != $b[.key]))')

# If there are changes
if [ ! -z "$changed_keys" ]; then
  # Scan the folder for language files
  for lang_file in *.json; do
    if [[ "$lang_file" != "en.json" && "$lang_file" != "en.json.lock" ]]; then
      lang_code="${lang_file%.*}"
      echo "Translating to $lang_code"
      # For each changed key or value
      echo "$changed_keys" | jq -c '.[]' | while read -r kv; do
        echo "Translating $kv to $lang_code"
        key=$(echo "$kv" | jq -r '.key')
        value=$(echo "$kv" | jq -r '.value')
        # Translate the value
        translated_value=$(translate "$value" "$lang_code")
        # Update the translation file
        jq --arg key "$key" --arg value "$translated_value" '.[$key] = $value' "$lang_file" > tmp.$$.json && mv tmp.$$.json "$lang_file"
      done
    fi
  done
fi

# Rewrite en.json.lock with content of en.json
cp en.json en.json.lock
