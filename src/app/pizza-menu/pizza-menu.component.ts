import { Component, OnInit } from '@angular/core';
import { Item, Size, Price, items, itemPrices, itemSizes } from './data';

@Component({
  selector: 'app-pizza-menu',
  templateUrl: './pizza-menu.component.html',
  styleUrls: ['./pizza-menu.component.css'],
})
export class PizzaMenuComponent implements OnInit {
  items: Item[] = [];
  itemPrices: Price[] = [];
  itemSizes: Size[] = [];
  selectedItem: Item | null = null;
  selectedSizes: { [itemId: number]: { [sizeId: number]: boolean } } = {};
  editedPrices: { [itemId: number]: { [sizeId: number]: number } } = {};

  constructor() {}

  ngOnInit(): void {
    this.items = items;
    this.itemPrices = itemPrices;
    this.itemSizes = itemSizes;
    this.initializeSelectedSizes();
    this.loadEditedPrices();
  }

  initializeSelectedSizes(): void {
    this.items.forEach((item) => {
      this.selectedSizes[item.itemId] = {};
      this.itemSizes.forEach((size) => {
        this.selectedSizes[item.itemId][size.sizeId] = true;
      });
    });
  }

  loadEditedPrices(): void {
    const storedPricesString = localStorage.getItem('editedPrices');
    if (storedPricesString !== null) {
      const storedPrices = JSON.parse(storedPricesString);
      this.editedPrices = storedPrices;
    }
  }

  saveEditedPrices(newEditedPrices: {
    [itemId: number]: { [sizeId: number]: number };
  }): void {
    localStorage.setItem('editedPrices', JSON.stringify(newEditedPrices));
  }

  handleItemClick(item: Item): void {
    this.selectedItem = this.selectedItem === item ? null : item;
  }

  handleSizeChange(itemId: number, sizeId: number): void {
    const newSizeState = { ...this.selectedSizes };
    if (!newSizeState[itemId]) {
      newSizeState[itemId] = {};
    }

    const isCurrentlySelected = newSizeState[itemId][sizeId];
    newSizeState[itemId][sizeId] = !isCurrentlySelected;

    if (!newSizeState[itemId][sizeId]) {
      const newEditedPrices = { ...this.editedPrices };
      if (newEditedPrices[itemId] && newEditedPrices[itemId][sizeId]) {
        delete newEditedPrices[itemId][sizeId];
        this.editedPrices = newEditedPrices;
        this.saveEditedPrices(newEditedPrices);
      }
    } else {
      const newEditedPrices = { ...this.editedPrices };
      if (!newEditedPrices[itemId]) {
        newEditedPrices[itemId] = {};
      }

      const defaultPrice = this.itemPrices.find(
        (price) => price.itemId === itemId && price.sizeId === sizeId
      );

      if (defaultPrice) {
        newEditedPrices[itemId][sizeId] = defaultPrice.price;
        this.editedPrices = newEditedPrices;
        this.saveEditedPrices(newEditedPrices);
      }
    }

    this.selectedSizes = newSizeState;
  }

  handlePriceChange(itemId: number, sizeId: number, event: any) {
    const newPrice = parseFloat(event.target.value);
    if (!isNaN(newPrice)) {
      const newEditedPrices = { ...this.editedPrices };
      if (!newEditedPrices[itemId]) {
        newEditedPrices[itemId] = {};
      }
      newEditedPrices[itemId][sizeId] = newPrice;
      this.editedPrices = newEditedPrices;
      this.saveEditedPrices(newEditedPrices);
    }
  }

  getItemSizePrice(itemId: number, sizeId: number): number {
    if (
      this.editedPrices[itemId] &&
      this.editedPrices[itemId][sizeId] !== undefined
    ) {
      return this.editedPrices[itemId][sizeId];
    }

    if (!this.selectedSizes[itemId] || !this.selectedSizes[itemId][sizeId]) {
      return 0.0;
    }

    const price = this.itemPrices.find(
      (p) => p.itemId === itemId && p.sizeId === sizeId
    );
    return price ? price.price : 0.0;
  }
}
