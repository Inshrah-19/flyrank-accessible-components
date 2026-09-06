# Accessibility Component Notes

## Overview

For this exercise, I first built three interactive components from scratch in React and JavaScript: a Modal Dialog, Tabs, and Disclosure. After completing and testing my own implementations, I installed shadcn/ui and added its Dialog and Tabs components for comparison.

The goal of the comparison was to understand what an established component implementation handles for me and which accessibility or maintainability concerns I had to implement myself.

## Modal Comparison

My custom Modal implemented the main accessibility behavior manually. I used refs and effects to move focus into the dialog, trap Tab and Shift+Tab navigation, handle Escape, restore focus to the trigger, make the background inert, and lock page scrolling.

The shadcn Dialog uses Radix Dialog primitives underneath the shadcn wrapper. This means much of the dialog behavior is handled by the underlying primitive instead of requiring a custom focus-management implementation.

### Concrete Gap 1: Focus Management

My implementation required custom focus-trap and focus-restoration logic. The shadcn Dialog delegates this behavior to Radix primitives, reducing the amount of accessibility logic that must be maintained manually.

### Concrete Gap 2: Dialog Composition

My modal implementation was a single custom component with its behavior and structure defined directly in the file. Shadcn provides separate reusable primitives such as `Dialog`, `DialogTrigger`, `DialogClose`, `DialogContent`, `DialogTitle`, and `DialogDescription`. This provides a more flexible and reusable API for different dialog structures.

## Tabs Comparison

My custom Tabs implementation supported the required three tabs and implemented keyboard navigation with ArrowLeft, ArrowRight, Home, End, wrapping behavior, and roving tabindex.

The shadcn Tabs implementation provides reusable primitives such as `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent`. It also exposes additional configuration such as orientation and styling variants.

### Concrete Gap 3: Reusability and Configuration

My Tabs implementation was designed specifically around the three playground tabs. Shadcn separates the root, tab list, triggers, and content into reusable primitives, making the component system easier to extend and reuse in different layouts.

### Concrete Gap 4: State and Styling Variants

My implementation handled active-tab styling directly in the component CSS. Shadcn centralizes variants and state styling through `class-variance-authority` and data attributes, making states such as active, focus, disabled, and different visual variants more systematic.

## What I Learned

Building the components myself made the accessibility requirements much clearer. In particular, keyboard interaction alone is not enough for a modal: focus needs to be moved correctly, trapped while the dialog is open, and restored when it closes.

The comparison also showed that component libraries are valuable not simply because they save coding time, but because they provide reusable abstractions around complex interaction patterns. However, building the components manually first helped me understand what those abstractions are actually handling.

## Conclusion

The main lesson from this exercise is that accessibility should be understood before relying on a component library. My implementations were functional and passed keyboard testing, but shadcn/Radix provides a more reusable and comprehensive component architecture that reduces the amount of interaction logic developers need to maintain manually.
