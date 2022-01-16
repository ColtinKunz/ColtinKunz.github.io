def all_unique_characters(word):
    for x, letter in enumerate(word):
        if x != len(word) - 1 and letter == word[x + 1]:
            return False
    return True
