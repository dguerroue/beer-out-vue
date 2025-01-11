import { nextTick } from "process";
import { ref, type Component } from "vue";

type BottomSheet = {
  id: string,
  isOpen?: boolean,
  component: Component
}

const bottomSheetStack = ref<BottomSheet[]>([]);

export function useBottomSheet() {

  function addBottomSheet(bs: Omit<BottomSheet, 'id' | 'isOpen'>) {
    const generatedId = Math.random().toString(36).substring(7);
    bottomSheetStack.value.push({
      id: generatedId,
      isOpen: false,
      component: bs.component
    });

    return generatedId;
  }

  function removeBottomSheet(id: string) {
    bottomSheetStack.value = bottomSheetStack.value.filter(bs => bs.id !== id)
  }

  function openBottomSheetById(id: string) {
    const bottomSheet = bottomSheetStack.value.find(bs => bs.id === id);

    if (!bottomSheet) {
      console.error(`BottomSheet ${id} not found`);
      return;
    }
    bottomSheet.isOpen = true;
  }

  function closeBottomSheetById(id: string) {
    const bottomSheet = bottomSheetStack.value.find(bs => bs.id === id);

    if (!bottomSheet) {
      console.error(`BottomSheet ${id} not found`);
      return;
    }

    bottomSheet.isOpen = false;
  }

  /**
   * Add and open a new bottom sheet
   */
  function openBottomSheet(component: Component) {
    // add new bs and open it

    const id = addBottomSheet({ component });

    nextTick(() => {
      openBottomSheetById(id);
    });

    return id;
  }

  return {
    bottomSheetStack,
    addBottomSheet,
    removeBottomSheet,
    openBottomSheetById,
    closeBottomSheetById,
    openBottomSheet
  }
}