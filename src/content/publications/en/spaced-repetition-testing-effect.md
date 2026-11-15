---
title: 'Spaced Repetition and the Testing Effect: A Short Review'
description: 'What a century of memory research says about spacing out study sessions and testing yourself – and what it means for learning languages.'
abstract: 'Two findings from cognitive psychology are unusually robust: information is retained longer when study is spread out over time, and retrieving information strengthens memory more than re-reading it. This example review summarises the classic evidence, sketches the forgetting curve that motivates spaced repetition software, and lists open questions. It is placeholder content and is also available in German.'
date: 2026-10-12
lang: en
type: review
subjects: [psychology, linguistics]
tags: [memory, learning, flashcards]
featured: true
example: true
translationKey: spaced-repetition
references:
  - id: ebbinghaus1885
    authors: 'Ebbinghaus, H.'
    year: 1885
    title: 'Über das Gedächtnis: Untersuchungen zur experimentellen Psychologie'
    source: 'Duncker & Humblot, Leipzig'
  - id: cepeda2006
    authors: 'Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D.'
    year: 2006
    title: 'Distributed practice in verbal recall tasks: A review and quantitative synthesis'
    source: 'Psychological Bulletin, 132(3), 354–380'
  - id: roediger2006
    authors: 'Roediger, H. L., & Karpicke, J. D.'
    year: 2006
    title: 'Test-enhanced learning: Taking memory tests improves long-term retention'
    source: 'Psychological Science, 17(3), 249–255'
---

Anyone who has crammed for an exam knows the feeling: the material is there the next morning and gone a week later. Memory research offers two simple remedies, both well supported by evidence.

## The forgetting curve

In the 1880s, Hermann Ebbinghaus memorised lists of nonsense syllables and measured how much he could still recall after different delays [@ebbinghaus1885]. Retention dropped steeply at first and then levelled off. A common simplified model describes this as exponential decay,

$$
R(t) = e^{-t/S},
$$

where $R$ is the probability of recall after time $t$ and $S$ is the *stability* of the memory. Each successful review increases $S$, so the curve flattens.

## The spacing effect

Spreading the same amount of study over several sessions leads to better long-term retention than massing it into one. A large meta-analysis found the effect across hundreds of studies, with the ideal gap growing with the length of time the information needs to be retained [@cepeda2006].

## The testing effect

Retrieving information – answering a question, writing down what you remember – strengthens memory more than reading the material again. In one well-known experiment, students who took practice tests remembered more a week later than students who spent the same time re-studying, even though they felt *less* confident [@roediger2006].

## Implications for language learning

Flashcard programs combine both effects: they ask you to recall a word (testing) and schedule the next review just before you would forget it (spacing).[^1]

1. Prefer recall over recognition: type the answer instead of picking it.
2. Keep sessions short and frequent.
3. Accept the difficulty – effortful retrieval is the point.

## Open questions

How well do these laboratory findings transfer to complex material such as grammar or mathematical reasoning? The evidence is thinner there, and it is the direction this review would expand into.

[^1]: The scheduling algorithms differ between programs, but all of them build on some version of the forgetting curve.
