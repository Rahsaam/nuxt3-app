<template>
    <div class="col-sm-12 col-lg-9">
        <div class="table-responsive">
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th>شماره سفارش</th>
                        <th>آدرس</th>
                        <th>وضعیت</th>
                        <th>وضعیت پرداخت</th>
                        <th>قیمت کل</th>
                        <th>تاریخ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in data.orders" :key="order.id">
                        <th>{{ order.id }}</th>
                        <td>{{ order.address_title }}</td>
                        <td>{{ order.status }}</td>
                        <td>
                            <span :class="{'text-success': order.payment_status === 'موفق', 'text-danger': order.payment_status === 'ناموفق'}">{{ order.payment_status }}</span>
                        </td>
                        <td>{{ order.paying_amount }}</td>
                        <td>{{ order.created_at }}</td>
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#modal-1">
                                محصولات
                            </button>
                            <div class="modal fade" id="modal-1">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h6 class="modal-title">محصولات سفارش
                                                شماره 25</h6>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <table class="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>محصول</th>
                                                        <th>نام</th>
                                                        <th>قیمت</th>
                                                        <th>تعداد</th>
                                                        <th>قیمت کل</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>
                                                            <img src="../images/b1.jpg" width="80" alt="">
                                                        </th>
                                                        <td class="fw-bold">برگر گوشت ذغالی</td>
                                                        <td>45,000 تومان</td>
                                                        <td>
                                                            2
                                                        </td>
                                                        <td>90,000 تومان</td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <img src="../images/p1.jpg" width="80" alt="">
                                                        </th>
                                                        <td class="fw-bold">پیتزا پپرونی</td>
                                                        <td>145,000 تومان</td>
                                                        <td>
                                                            1
                                                        </td>
                                                        <td>145,000 تومان</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
                    <nav class="d-flex justify-content-center mt-5">
                        <ul class="pagination">
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                        </ul>
                    </nav>
                </div>
</template>

<script setup>
const { data } = await useFetch('/api/profile/orders', {
    headers: useRequestHeaders(['cookie'])
});

console.log(data.value);
</script>

<style lang="scss" scoped>

</style>