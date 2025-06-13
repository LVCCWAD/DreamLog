<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationsController extends Controller
{
    public function notificationRead(Request $request, Notification $notification){
        $notification->is_read = true;
        $notification->save();
    }

    public function deleteNotification(Request $request, Notification $notification){
        if(Auth::id() == $notification->user_id){
        $notification->delete();}
    }
}
