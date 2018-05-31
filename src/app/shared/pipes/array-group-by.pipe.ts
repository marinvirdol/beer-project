import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'appArrayGroupBy'
})
export class ArrayGroupByPipe implements PipeTransform {
    transform(collection: any[], ...args: any[]): any[] {
        if (!collection) {
            return [];
        }
        return collection.reduce((acc: any[], cur: any, index: number) => {
            if (!acc.length || index % 5 === 0) {
                acc.push([cur]);
                return acc;
            }
            return acc.map((groupedItems: any[]) => {
                const next = groupedItems.length;
                if (groupedItems.length < 5) {
                    groupedItems.push(cur);
                } else {
                    acc.push([cur]);
                }
                return groupedItems;
            });
        }, []);
    }
}
