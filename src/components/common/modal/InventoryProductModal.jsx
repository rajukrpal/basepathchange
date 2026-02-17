import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { inventorySchema } from '@/validation/schemas';
import FormProvider from '@/form/FormProvider';
import TextField from '@/form/TextField';
import SelectField from '@/form/SelectField';

const InventoryProductModal = ({ open, onOpenChange, editData = null }) => {
    const isEdit = !!editData;

    const methods = useForm({
        resolver: yupResolver(inventorySchema),
        defaultValues: {
            name: '',
            sku: '',
            category: '',
            price: '',
            stock: '',
            status: ''
        }
    });

    const { handleSubmit, reset } = methods;

    // Reset form when modal opens or editData changes
    useEffect(() => {
        if (open) {
            if (editData) {
                // Populate form for editing
                // We strip the id and any other non-form fields if necessary, 
                // but usually resetting with the object is fine if names match.
                reset({
                    name: editData.name || '',
                    sku: editData.sku || '',
                    category: editData.category || '',
                    price: editData.price ? editData.price.toString().replace('$', '') : '',
                    stock: editData.stock || '',
                    status: editData.status || ''
                });
            } else {
                // Reset for new product
                reset({
                    name: '',
                    sku: '',
                    category: '',
                    price: '',
                    stock: '',
                    status: ''
                });
            }
        }
    }, [open, editData, reset]);

    const onSubmit = async (values) => {
        // --- API INTEGRATION STARTS HERE ---
        // try {
        //     if (isEdit) {
        //         // UPDATE API CALL:
        //         // await axios.patch(`/api/inventory/${editData.id}`, values);
        //         console.log('API CALL: Updating Product ID:', editData.id, 'with values:', values);
        //     } else {
        //         // CREATE API CALL:
        //         // await axios.post('/api/inventory', values);
        //         console.log('API CALL: Adding New Product with values:', values);
        //     }
        //     // refreshData(); // Call a function to reload the table
        //     onOpenChange(false);
        //     reset();
        // } catch (error) {
        //     console.error("API Error:", error);
        // }
        // ------------------------------------

        console.log(isEdit ? 'Updating Product (Dummy):' : 'Adding Product (Dummy):', values);
        onOpenChange(false);
        reset();
    };

    const categoryOptions = [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Furniture', value: 'Furniture' },
        { label: 'Clothing', value: 'Clothing' },
        { label: 'Office Supplies', value: 'Office Supplies' },
        { label: 'Kitchenware', value: 'Kitchenware' },
    ];

    const statusOptions = [
        { label: 'In Stock', value: 'In Stock' },
        { label: 'Low Stock', value: 'Low Stock' },
        { label: 'Out of Stock', value: 'Out of Stock' },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-[32px]">
                <div className="bg-[#F97316] p-8 text-white relative">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            {isEdit ? 'Edit Product' : 'Add New Product'}
                        </DialogTitle>
                        <DialogDescription className="text-orange-100 font-medium">
                            {isEdit 
                                ? 'Update the details of the existing inventory product.' 
                                : 'Enter product details to add it to your inventory system.'
                            }
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-8 bg-white">
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <TextField
                            name="name"
                            label="Product Name"
                            placeholder="e.g. Wireless Mouse"
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <TextField
                                name="sku"
                                label="SKU Number"
                                placeholder="e.g. WM-001"
                                disabled={isEdit} // SKU shouldn't change generally
                            />
                            <SelectField
                                name="category"
                                label="Category"
                                options={categoryOptions}
                                placeholder="Select category"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <TextField
                                name="price"
                                label="Price ($)"
                                placeholder="0.00"
                                numeric
                            />
                            <TextField
                                name="stock"
                                label="Initial Stock"
                                placeholder="0"
                                numeric
                            />
                        </div>

                        <SelectField
                            name="status"
                            label="Current Status"
                            options={statusOptions}
                            placeholder="Select status"
                        />

                        <div className="flex gap-3 pt-4">
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="flex-1 h-11 md:h-12 rounded-xl border-gray-100 font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                className="flex-1 h-11 md:h-12 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold shadow-lg shadow-orange-500/20 cursor-pointer transition-all active:scale-95"
                            >
                                {isEdit ? 'Update Product' : 'Add Product'}
                            </Button>
                        </div>
                    </FormProvider>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InventoryProductModal;
