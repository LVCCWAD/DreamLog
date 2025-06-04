<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function notificationRead(Request $request, Notification $notification){
        $notification->is_read = true;
        $notification->save();
    }
}
